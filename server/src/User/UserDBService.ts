import { User } from "../Model/User/User";
import { Media } from "../Model/Media/Media";
import { Genre } from "../Model/Genre/Genre";
import { Comment } from "../Model/Comment/Comment";
import {Database} from "../Database";
import { UsernameExists } from "../Model/Error/UsernameExists";
import { BcryptService } from "../Service/BcryptService";
import { WrongUsernameOrPassword } from "../Model/Error/WrongUsernameOrPassword";
import { InternalServerError } from "../Model/Error/InternalServerError";
import { AlreadyExist } from "../Model/Error/AlreadyExist";
import { TokenService } from "../Service/TokenService";
import userMapping from "../Service/UserMapping";
import {v1 as id} from "uuid";

export class UserDBService {

    db: Database;
    bcryptService: BcryptService;
    tokenService: TokenService;

    constructor(){
        this.db = new Database();
        this.bcryptService = new BcryptService();
        this.tokenService = new TokenService();
    }

    public async login(username: string, password: string): Promise<User> {
        let sqlQuery = "SELECT * FROM User WHERE username = '" + username + "';";
        try {
            let result = await this.db.sendQuery(sqlQuery);
            if(result.length == 0){
                throw new WrongUsernameOrPassword();
            }
            let hashedPsw = result[0].password;
            await this.bcryptService.comparePasswords(password, hashedPsw);
            let token = await this.tokenService.signIn(username);
            let user: User = userMapping.map(result[0]);
            user.token = token;
            user.password = null;
            return user;
        } 
        catch(err){
            if(err instanceof WrongUsernameOrPassword){
                throw err;
            }
            else{
                throw new InternalServerError();
            }
        }
    }

    public async register(user: User, genres: Genre[]): Promise<any> {
        let hashedPsw = await this.bcryptService.passwordHash(user.password);
        let sqlQuery = "INSERT INTO User(username, email, userType, password) VALUES('" + user.username + "','" + user.email + "','" + user.userType + "','" + hashedPsw + "');"

        try {
            await this.db.sendQuery(sqlQuery);
            for (var i = 0; i < genres.length; i++)
            {
                sqlQuery = "INSERT INTO GenrePreference VALUES ('" + user.username + "', '" + genres[i].genreId + "');";
                await this.db.sendQuery(sqlQuery);  
            }
            return null;
        } 
        catch(err){
            if(err.code == "ER_DUP_ENTRY"){
                throw new UsernameExists();
            }
            else{
                throw err;
            }
        }
    }

    public async getParties(user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT name AS partyName, partyId FROM Party WHERE creatorUsername = '" + user.username + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            return result;
        } 
        catch(err){
            throw err;
        }
    }

    public async addComment(user: User, media: Media, comment: Comment): Promise<any> {
        let commentId = id();
        let sqlQuery = "INSERT INTO Comment VALUES('" + commentId + "', '" + user.username + "', '" + media.mediaId + "', '" + comment.text + "', '" + comment.timeStamp + "');";

        try {
            await this.db.sendQuery(sqlQuery);
            if(comment.parentId != null){
                sqlQuery = "INSERT INTO SubComment VALUES('" + comment.parentId + "', '" + commentId + "');";
                await this.db.sendQuery(sqlQuery);
            }
            return null;
        } 
        catch(err){
            if(err.code == "ER_DUP_ENTRY"){
                throw new AlreadyExist();
            }
            else{
                throw err;
            }
        }
    }

    public async deleteComment(comment: Comment): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM Comment WHERE commentId = '" + comment.commentId + "' AND username = '" + comment.username + "';";

        try {
            await this.db.sendQuery(sqlQuery);
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
            return result;
        } 
        catch(err){
            throw err;
        }
    }

    public async getFriendActivities(user: User): Promise<any> {
        let resultFriends = null;
        let resultActivities = null;

        let sqlQuery = "SELECT F.friend2Username, WHERE F.friend1Username = '" + user.username + "';";

        try {
            resultFriends = await this.db.sendQuery(sqlQuery);
            sqlQuery = "SELECT F.friend1Username, WHERE F.friend2Username = '" + user.username + "';";
            resultFriends.concat(await this.db.sendQuery(sqlQuery));
            if (resultFriends.length > 0)
            {
                sqlQuery = "SELECT W.username, M.name FROM , Watch W, Media M WHERE FIND_IN_SET(W.username, " + resultFriends + ") AND W.mediaId = M.mediaId;";
                resultActivities = await this.db.sendQuery(sqlQuery);
            }
        } 
        catch(err){
            throw err;
        }
        return resultActivities;
    }

    public async rateMedia(user: User, media: Media, rate: number): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM MediaRating WHERE mediaId = '" + media.mediaId + "' AND username = '" + user.username + "';"

        try {
            result = await this.db.sendQuery(sqlQuery);
            if (result.length == 0)
            {
                sqlQuery = "INSERT INTO MediaRating VALUES('" + user.username + "', '" + media.mediaId + "', " + rate + ");";
            }
            else
            {
                sqlQuery = "UPDATE MediaRating SET rating = " + rate + " WHERE mediaId = '" + media.mediaId + "' AND username = '" + user.username + "';";
            }
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            if(err.code == "ER_DUP_ENTRY"){
                throw new AlreadyExist();
            }
            else{
                throw err;
            }
        }
        return result;
    }


    public async addGenre(user: User, genre: Genre): Promise<any> {
        let result = null;

        let sqlQuery = "INSERT INTO GenrePreference VALUES ('" + user.username + "', '" + genre.genreId + "');";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            if(err.code == "ER_DUP_ENTRY"){
                throw new AlreadyExist();
            }
            else{
                throw err;
            }
        }
        return result;
    }

    public async getUserGenres(user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT Genre.title AS genreName, Genre.genreId FROM Genre INNER JOIN GenrePreference ON GenrePreference.genreId = Genre.genreId WHERE GenrePreference.username = '" + user.username + "';";
        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async deleteGenre(user: User, genre: Genre): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM GenrePreference WHERE username = '" + user.username + "' and genreId = '" + genre.genreId + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async changePassword(user: User, newPassword: string): Promise<any> {
        let result = null;

        let sqlQuery = "UPDATE User SET password = '" + newPassword + "' WHERE username = '" + user.username + "' AND password = '" + user.password + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async changeInfo(user: User, newUsername: string, newEmail: string, newUserType: string): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM User WHERE username = '" + user.username + "' AND ('" + newUsername + "', '" + newEmail + "') NOT IN (SELECT U.username, U.email FROM User U);";

        try {
            result = await this.db.sendQuery(sqlQuery);
            if (result.length > 0)
            {
                sqlQuery = "UPDATE User SET username = '" + newUsername + "', email = '" +  newEmail +"', userType = '" + newUserType + "' WHERE username = '" + user.username + "';";
                result = await this.db.sendQuery(sqlQuery);
                let token = await this.tokenService.signIn(newUsername);
                let changedUser: User = userMapping.map(result[0]);
                changedUser.token = token;
                changedUser.password = null;
                return changedUser;
            }
            else{
                throw new AlreadyExist();
            }
        } 
        catch(err){
            throw err;
        }
    }
    /*
    

    


    public async addFriend(mainUser: User, invitedUser: string): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM FriendshipInvitation WHERE inviterUsername = '" + mainUser.username + "' and invitedUsername = '" + invitedUser + "';"+
                    "\n INSERT INTO Friendship VALUES('" + mainUser.username + "', '" + invitedUser + "');";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async deleteFriend(mainUser: User, deletedUser: string): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM Friendship WHERE friend1Id = '" + mainUser.username + "' and friend2Id = '" + deletedUser + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }*/
}