import { User } from "../Model/User/User";
import { Media } from "../Model/Media/Media";
import { Genre } from "../Model/Genre/Genre";
import { Channel } from "../Model/Channel/Channel";
import { Party } from "../Model/Party/Party";
import {Database} from "../Database";
import {AlreadyExist} from "../Model/Error/AlreadyExist";
import {v1 as id} from "uuid";

export class PartyDBService {
    private db: Database;

    constructor(){
        this.db = new Database();
    }

    public async addParty(party: Party): Promise<any> {
        let partyId = id();
        let sqlQuery = "INSERT INTO Party VALUES('" + partyId + "', '" + party.username + "', '" + party.name + "', '" + party.description + "', 'ROLE_CREATOR');";

        console.log( "Partu addition 1");
        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        console.log( "Partu addition 2");
        return partyId;
    }

    public async removeParty(party: Party): Promise<any> {
        let result = null;
        console.log( "Start delete");
        let sqlQuery = "DELETE FROM Party WHERE partyId = '" + party.partyId + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        console.log( "End delete");
        return result;
    }

    public async getParties(user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM Party WHERE username = '" + user.username + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async inviteParticipant(party: Party, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM User WHERE username = '" + user.username + "';";
        
        try {
            result = await this.db.sendQuery(sqlQuery);
            if (result.length > 0)
            {
                sqlQuery = "INSERT INTO PartyInvitation VALUES('" + party.partyId + "', '" + user.username + "', null);";
                await this.db.sendQuery(sqlQuery);
            }
        } 
        catch(err){
            throw err;
        }
        return null;
    }

    public async acceptPartyInvite(party: Party, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM PartyInvitation WHERE username = '" +  user.username + "' and partyId = '" + party.partyId + "';";

        try {
            await this.db.sendQuery(sqlQuery);
            sqlQuery = "INSERT INTO Party VALUES('" + party.partyId + "', '" + party.username + "', " + party.name + "', " + party.description + "', ROLE_PARTICIPANT);";
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async declinePartyInvite(party: Party, user: User): Promise<any> {
        let result = null;
        let sqlQuery = "DELETE FROM PartyInvitation WHERE username = '" +  user.username + "' and partyId = '" + party.partyId + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getPartyInvitations(user: User): Promise<any> {
        let result = null;
        let sqlQuery = "SELECT PI.username, P.name FROM PartyInvitation PI, Party P WHERE PI.partyId = P.PartyId AND PI.username = '" + user.username + "';";
        
        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getParticipants(party: Party): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM Party WHERE partyId = '" + party.partyId + "';";
        
        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }
    

    public async removeParticipant(party: Party, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM PartyParticipation WHERE partyId = '" + party.partyId + "' AND username = '" + user.username + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }
}