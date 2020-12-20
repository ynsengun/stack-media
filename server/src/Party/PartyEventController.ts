import { NoAccess } from "../Model/Error/NoAccess";
import { ErrorResponse } from "../Model/Response/ErrorResponse";
import { SuccessResponse } from "../Model/Response/SuccessResponse";
import { UserDBService } from "../User/UserDBService";
import {Party} from "./Party";
import { MediaDBService } from "../Media/MediaDBService";
import { PartyDBService } from "./PartyDBService";
import { InvalidRequest } from "Model/Error/InvalidRequest";

export class PartyEventController{

    private partyDBService: PartyDBService;
    private mediaDBService: MediaDBService;
    private parties: Party[];

    constructor(){
        this.partyDBService = new PartyDBService();
        this.mediaDBService = new MediaDBService();
        this.parties = [];
    }

    private checkCreator(client, event: string, party: Party, data){
        let creatorUsername: string = party.getCreatorUsername();
        if(creatorUsername != data.username){
            client.emit(event + '-response', new ErrorResponse(new NoAccess()));
            return false;
        }
        return true;
    }

    private sendOthers(socket, client, event: string, party: Party, data){
        let participants = party.getMemberSocketIds();
        let cSocket = participants.creatorSocketId
        if(cSocket != null && cSocket != client.id) socket.to(participants.creatorSocketId).emit(event + '-notification', new SuccessResponse(data));
        for(let i = 0 ; i < participants.participantSocketIds.length ; i++){
            let socketId: string = participants.participantSocketIds[i];
            if(socketId != client.id) socket.to(socketId).emit(event + '-notification', new SuccessResponse(data));
        }
        client.emit(event + '-response', new SuccessResponse(null));
    }

    public createParty(creatorUsername: string, partyId: string){
        this.parties.push(new Party(creatorUsername, partyId));
    }

    private getPartyById(partyId: string): Party{
        for(let i = 0 ; i < this.parties.length; i++){
            if(this.parties[i].getPartyId() == partyId) return this.parties[i];
        }
        return null;
    }

    public async setMedia(socket, client, data){
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        if(party == null) {
            client.emit('set-media-response', new ErrorResponse(new InvalidRequest()));
            return;
        }
        if(!this.checkCreator(client, 'set-media', party, data)) return;
        party.setMedia(data.mediaId);
        this.sendOthers(socket, client, 'set-media', party, {username: data.username});
    }

    public participate(socket, client, data){
        /* TODO
        // check if it is participant from party db service
        */
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        if(party == null) {
            client.emit('participate-response', new ErrorResponse(new InvalidRequest()));
            return;
        }
        party.participate(data.username, client.id);
        this.sendOthers(socket, client, 'participate', party, {username: data.username});
    }

    public sendMessage(socket, client, data){
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        if(party == null) {
            client.emit('send-message-response', new ErrorResponse(new InvalidRequest()));
            return;
        }
        this.sendOthers(socket, client, 'send-message', party, {username: data.username, message: data.message});
    }

    public async watch(socket, client, data){
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        if(party == null) {
            client.emit('watch-response', new ErrorResponse(new InvalidRequest()));
            return;
        }
        if(!this.checkCreator(client, 'watch', party, data)) return;
        
        let participants = party.getMemberUsernames();
        let curMedia = party.getCurrentMedia();
        let creatorUsername = participants.creatorUsername
        await this.mediaDBService.partyWatch(creatorUsername, curMedia, data.progress);
        for(let i = 0 ; i < participants.participantUsernames.length ; i++){
            let username: string = participants.participantUsernames[i];
            await this.mediaDBService.partyWatch(username, curMedia, data.progress);
        }
        this.sendOthers(socket, client, 'watch', party, {progress: data.progress});
    }

    public leave(socket, client, data){
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        if(party == null) {
            client.emit('leave-response', new ErrorResponse(new InvalidRequest()));
            return;
        }
        if(!party.leave(data.username, client.id)) return;
        this.sendOthers(socket, client, 'leave', party, {username: data.username});
    }

    public takeOut(socket, client, data){
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        if(party == null) {
            client.emit('take-out-response', new ErrorResponse(new InvalidRequest()));
            return;
        }
        if(!this.checkCreator(client, 'take-out', party, data)) return;
        if(!party.takeOut(data.username)){
            client.emit('take-out-response', new ErrorResponse(new InvalidRequest()));
            return;
        }
        /* TODO
        // remove this person from party table
        */
        this.partyDBService.removeParticipant()
        //
        this.sendOthers(socket, client, 'take-out', party, {username: data.username});
    }

    public remove(socket, client, data){
        let partyId: string = data.partyId;
        let party: Party = this.getPartyById(partyId);
        if(party == null) {
            client.emit('remove-response', new ErrorResponse(new InvalidRequest()));
            return;
        }
        if(!this.checkCreator(client, 'remove', party, data)) return;
        for(let i = 0 ; i < this.parties.length ; i++){
            if(this.parties[i].getPartyId() == partyId) this.parties.splice(i, 1);
        }
        this.sendOthers(socket, client, 'take-out', party, {username: data.username});
    }

    
}