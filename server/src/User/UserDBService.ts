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

        let sqlQuery = "SELECT * FROM User WHERE email = '" + email + "' and password = '" + password + "';";

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

        let sqlQuery = "INSERT INTO User VALUES('" + user.userId + "','" + user.username + "','" + user.email + "','" + user.userType + "','" + user.password + "');"

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
}