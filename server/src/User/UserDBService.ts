import { User } from "Model/User/User";
import { connected } from "process";
import { compileFunction } from "vm";
import {Database} from "../Database";
import * as util from "util";

export class UserDBService {

    db: Database;

    constructor(){
        this.db = new Database();
    }

    public async login(email: string, password: string): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM User WHERE email = '" + email + "' AND password = '" + password + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return (result.length == 1);
    }

    public async register(user: User): Promise<any> {
        let result = null;

        let sqlQuery = "INSERT INTO User VALUES('" + user.username + "','" + user.username + "','" + user.email + "','" + user.userType + "','" + user.password + "');"

        try {
            result = await this.db.sendQuery(sqlQuery);
            console.log(result);
            // TODO
        } 
        catch(err){
            if(err.code == "ER_DUP_ENTRY"){
                throw err;
            }
            throw err;
        }
        return (result.length == 1);
    }

    public async getParties(user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT name AS partyName, partyId FROM Party WHERE creatorUsername = '" + user.username + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            console.log(result);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getChannels(user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT title AS channelName, channelId FROM User INNER JOIN Channel ON Channel.username = '" + user.username + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            console.log(result);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getFriendActivities(user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT F.friend2Username, M.name FROM Friendship F, Watch W, Media M WHERE F.friend1Username = '" + user.username + "' AND W.username = F.friend2Username AND W.mediaId = M.mediaId;";

        try {
            result = await this.db.sendQuery(sqlQuery);
            console.log(result);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async addFriend(mainUser: User, invitedUser: User): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM FriendshipInvitation WHERE inviterUsername = '" + mainUser.username + "' and invitedUsername = '" + invitedUser.username + "';"+
                    "\n INSERT INTO Friendship VALUES('" + mainUser.username + "', accepted-friendUsername);";

        try {
            result = await this.db.sendQuery(sqlQuery);
            console.log(result);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async deleteFriend(mainUser: User, deletedUser: User): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM Friendship WHERE friend1-id = '" + mainUser.username + "' and friend2-id = '" + deletedUser.username + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            console.log(result);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }
}