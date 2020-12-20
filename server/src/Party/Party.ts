export class Party{

    private participantSocketIds: string[];
    private participantUsernames: string[];
    private creatorSocketId: string;
    private creatorUsername: string;
    private partyId: string;
    private currentMediaId: string;

    constructor(creatorUsername: string, partyId: string){
        this.participantSocketIds = [];
        this.participantUsernames = [];
        this.creatorSocketId = null;
        this.creatorUsername = creatorUsername;
        this.currentMediaId = null;
        this.partyId = partyId;
    }

    public getPartyId(): string{
        return this.partyId;
    }

    public getCurrentMedia(){
        return this.currentMediaId;
    }

    public setMedia(mediaId: string){
        this.currentMediaId = mediaId;
    }

    public checkParticipant(username: string, socketId: string): boolean{
        if(username == this.creatorUsername) return this.creatorSocketId == socketId;
        for(let  i = 0 ; i < this.participantUsernames.length ; i++){
            if(this.participantUsernames[i] == username && this.participantSocketIds[i] == socketId) return true;
        }
        return false;
    }

    public participate(username: string, socketId: string): any{
        if(username == this.creatorUsername) this.creatorSocketId = socketId;
        else{
            this.participantUsernames.push(username);
            this.participantSocketIds.push(socketId);
        }
    }

    public leave(socketId: string){
        let partyId = null;
        let username = null;
        if(socketId == this.creatorSocketId){
            this.creatorSocketId = null;
            partyId = this.partyId;
            username = this.creatorUsername;
        }
        else{
            for(let i = 0 ; i < this.participantSocketIds.length ; i++){
                if(this.participantSocketIds[i] == socketId){
                    partyId = this.partyId;
                    username = this.participantUsernames[i];
                    this.participantUsernames.splice(i, 1);
                    this.participantSocketIds.splice(i, 1);
                    i--;
                }
            }
        }
        return {partyId: partyId, username: username};
    }

    public takeOut(username: string){
        let found = false;
        for(let i = 0 ; i < this.participantUsernames.length ; i++){
            if(this.participantUsernames[i] == username){
                this.participantUsernames.splice(i, 1);
                this.participantSocketIds.splice(i, 1); 
                i --;
                found = true;
            }
        }
        return found;
    }

    public getMemberSocketIds(): any{
        return {creatorSocketId: this.creatorSocketId, participantSocketIds: this.participantSocketIds};
    }

    public getMemberUsernames(): any{
        return {creatorUsername: this.creatorUsername, participantUsernames: this.participantUsernames};
    }

    public getCreatorUsername(): string{
        return this.creatorUsername;
    }

    public getCreatorSocketId(): string{
        return this.creatorSocketId;
    }


    
}