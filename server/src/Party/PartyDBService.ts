import { User } from "../Model/User/User";
import { Media } from "../Model/Media/Media";
import { Genre } from "../Model/Genre/Genre";
import { Channel } from "../Model/Channel/Channel";
import { Party } from "../Model/Party/Party";
import {Database} from "../Database";
import {AlreadyExist} from "../Model/Error/AlreadyExist";
import {v1 as id} from "uuid";

export class PartyDBService {
    db: Database;

    constructor(){
        this.db = new Database();
    }

    public async addParty(party: Party): Promise<any> {
        let result = null;
        let partyId = id();
        let sqlQuery = "INSERT INTO Party VALUES('" + partyId + "', '" + party.creatorUsername + "', " + party.name + "', " + party.description + "', 1);";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async removeParty(party: Party): Promise<any> {
        let result = null;

        let sqlQuery = "REMOVE FROM Party WHERE partyId = '" + party.partyId + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getParties(user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM Party WHERE creatorUsername = '" + user.username + "';";

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

        let sqlQuery = "INSERT INTO PartyInvitation VALUES('" + party.partyId + "', '" + user.username + "', null);";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async acceptPartyInvite(party: Party, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "REMOVE FROM PartyInvitation WHERE username = '" +  user.username + "' and partyId = '" + party.partyId + "';";

        try {
            await this.db.sendQuery(sqlQuery);
            sqlQuery = "INSERT INTO PartyParticipation VALUES('" + party.partyId + "', '" + user.username + "');";
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async declinePartyInvite(party: Party, user: User): Promise<any> {
        let result = null;
        let sqlQuery = "REMOVE FROM PartyInvitation WHERE username = '" +  user.username + "' and partyId = '" + party.partyId + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getParticipants(party: Party): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM PartyParticipation WHERE partyId = '" + party.partyId + "';";
        
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

        let sqlQuery = "REMOVE FROM PartyParticipation WHERE partyId = '" + party.partyId + "' AND username = '" + user.username + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }
}