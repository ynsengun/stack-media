import { NoAccess } from "../Model/Error/NoAccess";
import { ErrorResponse } from "../Model/Response/ErrorResponse";
import { SuccessResponse } from "../Model/Response/SuccessResponse";
import partyMapping from "../Service/PartyMapping";
import {Party} from "./Party";
import { MediaDBService } from "../Media/MediaDBService";
import { PartyDBService } from "./PartyDBService";
import { InvalidRequest } from "../Model/Error/InvalidRequest";
import userMapping from "../Service/UserMapping";
import {ErrorModel} from "../Model/Error/Error";

class PartyEventController{

    private partyDBService: PartyDBService;
    private mediaDBService: MediaDBService;
    private parties: Party[];
    private socket;

    constructor(){
        this.partyDBService = new PartyDBService();
        this.mediaDBService = new MediaDBService();
        this.parties = [];
        this.socket = null;
        this.initializeParties();
    }

    public setSocket(socket){
        this.socket = socket;
    }

    private async initializeParties(){
        let parties = await this.partyDBService.getAllParties();
        for(let i = 0 ; i < parties.length ; i++){
            this.createParty(parties[i].username, parties[i].partyId);
        }
    }

    private checkCreator(client, event: string, party: Party, data){
        let creatorUsername: string = party.getCreatorUsername();
        //let creatorSocketId: string = party.getCreatorSocketId();
        //console.log("---->>> ", data, creatorUsername, creatorSocketId, client);
        let partyId = party.getPartyId();
        if(creatorUsername != data.username){
          console.log("creator rejected");
            //if(client != null) this.socket.emit(event + '-response', new ErrorResponse(new NoAccess()));
            this.sendOthers(event, {username: data.username, partyId: data.partyId}, new NoAccess());
            return false;
        }
        return true;
    }

    private sendOthers(event: string, data, error: ErrorModel){
        //let participants = party.getMemberSocketIds();
        //let cSocket = participants.creatorSocketId
        //console.log(cSocket, participants.participantSocketIds.length);
        if(error == null){
            this.socket.emit(event + '-response', {username: data.username, partyId: data.partyId, response: new SuccessResponse(data)});
        }
        else{
            this.socket.emit(event + '-response', {username: data.username, partyId: data.partyId, response: new ErrorResponse(error)});
        }
        /*if(cSocket != null && cSocket != client.id) this.socket.to(participants.creatorSocketId).emit(event + '-notification', new SuccessResponse(data));
        for(let i = 0 ; i < participants.participantSocketIds.length ; i++){
            let socketId: string = participants.participantSocketIds[i];
            if(socketId != client.id) this.socket.to(socketId).emit(event + '-notification', new SuccessResponse(data));
        }
        console.log(client == null, client.id);
        this.socket.to(client.id).emit(event + '-response', new SuccessResponse(null));
        this.socket.to(client.id).emit("hello-world", "1");
        this.socket.emit("hello-world", "3");*/
    }

    /*private sendOthersWithParticipantList(event: string, participants, data){
        let cSocket = participants.creatorSocketId
        if(cSocket != null) this.socket.to(participants.creatorSocketId).emit(event + '-notification', new SuccessResponse(data));
        for(let i = 0 ; i < participants.participantSocketIds.length ; i++){
            let socketId: string = participants.participantSocketIds[i];
            this.socket.to(socketId).emit(event + '-notification', new SuccessResponse(data));
        }
    }*/

    public createParty(creatorUsername: string, partyId: string){
        console.log(this.parties.length + " is the length before!");
        this.parties.push(new Party(creatorUsername, partyId));
        console.log(this.parties.length + " is the new length!");
    }

    private getPartyById(partyId: string): Party{
      // console.log(this.parties);
        for(let i = 0 ; i < this.parties.length; i++){
            // console.log( "Get party id:");
            // console.log(this.parties[i].getPartyId() );
            // console.log( "PArty ID arg");
            // console.log( partyId);
            if(this.parties[i].getPartyId() === partyId)
            {
                // console.log( this.parties[i]);
                return this.parties[i];
            }
        }
        console.log( "Out of loop!");
        return null;
    }

    public async setMedia(client, data){
      console.log(data);
        if(!data.partyId || !data.username || !data.mediaId){
            //client.emit('set-media-response', new ErrorResponse(new InvalidRequest()));
            //this.socket.emit('set-media-response', {username: data.username, error: new ErrorResponse(new InvalidRequest())});
            this.sendOthers('set-media', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        console.log("jhsgdjhafkahsfda");
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        console.log("Set media controller begins!");
        if(party == null) {
          console.log("party nullllllllllllllllllll");
            //client.emit('set-media-response', new ErrorResponse(new InvalidRequest()));
            //this.socket.emit('set-media-response', {username: data.username, error: new ErrorResponse(new InvalidRequest())});
            this.sendOthers('set-media', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        console.log("There is a party (set media)");
        if(!this.checkCreator(client, 'set-media', party, data)) return;
        console.log("It is the creator (se tmedia)");
        party.setMedia(data.mediaId);
        console.log("It is ready to notify others");
        this.sendOthers('set-media', {username: data.username, mediaId: data.mediaId, partyId: data.partyId}, null);
    }

    public async join(client, data){
      console.log(data);
        if(!data.partyId || !data.username){
            //client.emit('join-response', new ErrorResponse(new InvalidRequest()));
            //this.socket.emit('join-response', {data: data.username, error: new ErrorResponse(new InvalidRequest())});
            this.sendOthers('join', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        console.log("11111111");
        let participantList = await this.partyDBService.getParticipants(partyMapping.map({partyId: data.partyId}));
        let isParticipant = false;
        for(let i = 0 ; i < participantList.length; i++){
            if(participantList[i].username == data.username){
                isParticipant = true;
            }
        }
        console.log("22222222");
        if(!isParticipant){
            console.log(data.username + " is not a participant");
            //client.emit('join-response', new ErrorResponse(new NoAccess()));
            //this.socket.emit('join-response', {data: data.username, error: new ErrorResponse(new NoAccess())});
            this.sendOthers('join', {username: data.username, partyId: data.partyId}, new NoAccess());
            return;
        }
        console.log("join controller method begins");
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        if(party == null) {
            console.log("No party (join)");
            //client.emit('join-response', new ErrorResponse(new InvalidRequest()));
            //this.socket.emit('join-response', {data: data.username, error: new ErrorResponse(new InvalidRequest())});
            this.sendOthers('join', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        console.log("join controller checks finish");
        party.participate(data.username, client.id);
        console.log("Ready to notify others!");
        this.sendOthers('join', {username: data.username, partyId: data.partyId}, null);
    }

    public sendMessage(client, data){
        if(!data.partyId || !data.username || !data.message){
            //client.emit('send-message-response', new ErrorResponse(new InvalidRequest()));
            //this.socket.emit('send-message-response', {username: data.username, error: new ErrorResponse(new InvalidRequest())});
            this.sendOthers('send-message', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        console.log("1111111");
        if(party == null) { // No party
            console.log("No party " + partyId + " (send message)");
            //client.emit('send-message-response', new ErrorResponse(new InvalidRequest()));
            //this.socket.emit('send-message-response', {username: data.username, error: new ErrorResponse(new InvalidRequest())});
            this.sendOthers('send-message', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        console.log("2222222");
        // if(!party.checkParticipant(data.username, client.id)){ // It is not a participant
        //     console.log(data.username + "is not a participant for party " + data.partyId + " (send message)");
            //client.emit('send-message-response', new ErrorResponse(new NoAccess()));
            // this.socket.emit('send-message-response', {username: data.username, error: new ErrorResponse(new NoAccess())});
        //     this.sendOthers('send-message', {username: data.username, partyId: data.partyId}, new NoAccess());
        //     return;
        // }
        console.log("Send message ready to notify others!");
        this.sendOthers('send-message', {username: data.username, message: data.message, partyId: data.partyId}, null);
    }

    public async watch(client, data){
        if(!data.partyId || !data.username || !data.progress){
            //client.emit('watch-response', new ErrorResponse(new InvalidRequest()));
            //this.socket.emit('watch-response', {username: data.username, error: new ErrorResponse(new InvalidRequest())});
            this.sendOthers('watch', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        if(party == null) {
            console.log("No party (watch)");
            //client.emit('watch-response', new ErrorResponse(new InvalidRequest()));
            //this.socket.emit('watch-response', {username: data.username, error: new ErrorResponse(new InvalidRequest())});
            this.sendOthers('watch', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        if(!this.checkCreator(client, 'watch', party, data)) return;
        console.log("There is a party and it is the creator! (watch)");
        let participants = party.getMemberUsernames();
        let curMedia: string = party.getCurrentMedia();
        let creatorUsername = participants.creatorUsername;
        await this.mediaDBService.partyWatch(creatorUsername, curMedia, data.progress);
        console.log("Watch for creator is ok!");
        for(let i = 0 ; i < participants.participantUsernames.length ; i++){
            console.log("watch p " + i);
            let username: string = participants.participantUsernames[i];
            await this.mediaDBService.partyWatch(username, curMedia, data.progress);
        }
        console.log("Watch for participants is ok and ready to notify others!");
        this.sendOthers('watch', {progress: data.progress, username: data.username, partyId: data.partyId}, null);
    }

    // it should be checked. I remove all connections that have this socket id 
    // (but I think even different tabs in a browser use different socket id, so it shouldnt be a problem)
    // but it should be checked!!!
    public leave(client){
        console.log("Leave controller begins");
        let results = [];
        for(let i = 0 ; i < this.parties.length ; i++){
            let result = this.parties[i].leave(client.id)
            if(result.partyId != null){
                results.push(result);
            }
        }
        if(results.length == 0){
            console.log("No participants with this socket id (leave)");
            //client.emit('leave-response', new ErrorResponse(new InvalidRequest()));
            //this.sendOthers('leave', {username: data.username, })
            return;
        }
        console.log("Ready to notify others (leave)");
        console.log(results.length + " is the number of parties that socket id participates!");
        this.sendOthers('leave', {username: results[0].username, partyId: results[0].partyId}, null);
    }

    public async takeOut(client, data){
        if(!data.partyId || !data.username || !data.participantUsername){
            //client.emit('take-out-response', new ErrorResponse(new InvalidRequest()));
            this.sendOthers('take-out', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        console.log("Take out (controller) begins");
        if(party == null) {
            //client.emit('take-out-response', new ErrorResponse(new InvalidRequest()));
            this.sendOthers('take-out', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        console.log("There is a party (take out)");
        if(!this.checkCreator(client, 'take-out', party, data)) return;
        console.log("it is the creator (take out)");
        if(!party.takeOut(data.participantUsername)){
            //client.emit('take-out-response', new ErrorResponse(new InvalidRequest()));
            this.sendOthers('take-out', {username: data.username, partyId: data.partyId}, new InvalidRequest());
            return;
        }
        console.log("It is ready to take out him from db");
        await this.partyDBService.removeParticipant(partyMapping.map({partyId: data.partyId}), userMapping.map({username: data.participantUsername}));
        console.log("it is ready to notify others (take out)");
        this.sendOthers('take-out', {username: data.username, otherUsername: data.participantUsername, partyId: data.partyId}, null);
    }

    public remove(data){ // it is called by party business, not by the client socket
        console.log( "rem1");
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        console.log( "rem2");
        if(party == null) {
            console.log( "rem3");
            throw new InvalidRequest();
        }
        console.log("there is a party (remove)");
        if(!this.checkCreator(null, 'remove', party, data)){
            throw new NoAccess();
        }
        console.log("It is the creator (remove)");
        let participants = party.getMemberSocketIds();
        console.log("Deleting the party from the party array");
        for(let i = 0 ; i < this.parties.length ; i++){
            if(this.parties[i].getPartyId() == partyId) this.parties.splice(i, 1);
        }
        console.log("It is ready to notify others! (remove)");
        this.sendOthers('remove', {username: data.username, partyId: partyId}, null);
    }

    
}

export default new PartyEventController();