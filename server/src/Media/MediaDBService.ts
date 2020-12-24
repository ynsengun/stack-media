import { User } from "../Model/User/User";
import { Media } from "../Model/Media/Media";
import { Genre } from "../Model/Genre/Genre";
import { Channel } from "../Model/Channel/Channel";
import {Database} from "../Database";
import {AlreadyExist} from "../Model/Error/AlreadyExist";
import {v1 as id} from "uuid";
import {Comment} from "../Model/Comment/Comment";
import commentMapping from "../Service/CommentMapping";

export class MediaDBService {

    db: Database;

    constructor(){
        this.db = new Database();
    }

    public async getMedia(media: Media): Promise<any> {
        let result = null;
        let sqlQuery = "SELECT M.*, NULL, TV.*, 1 as type FROM Media M, TVSeriesEpisode TV WHERE M.mediaId = '" + media.mediaId + "' AND M.mediaId = TV.mediaId;";
        //let sqlQuery = "SELECT * FROM Media WHERE mediaId = '" + media.mediaId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            sqlQuery = "SELECT M.*, MO.oscarAward, NULL, NULL, NULL, 0 as type FROM Media M, Movie MO WHERE M.mediaId = '" + media.mediaId + "' AND M.mediaId = MO.mediaId;";
            let movieResult = await this.db.sendQuery(sqlQuery);
            for(let i = 0 ; i < movieResult.length ; i++){
                result.push(movieResult[i]);
            }
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getSeries(user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT DISTINCT TVSerieName FROM TVSeriesEpisode TV, MediaHasGenre MG WHERE TV.mediaId=MG.mediaId AND MG.genreId IN (SELECT genreId FROM GenrePreference WHERE username='" + user.username + "');";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getSerie(user: User, media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT M.*, TV.*, W.* FROM TVSeriesEpisode TV INNER JOIN Media M ON M.mediaId = TV.mediaId LEFT OUTER JOIN Watch W ON W.mediaId = M.mediaId WHERE TV.TVSerieName='" + media.TVSerieName + "' AND W.username='" + user.username + "' ORDER BY W.timeStamp DESC;";
        //let sqlQuery = "SELECT M.*, TV.* FROM TVSeriesEpisode TV INNER JOIN Media M ON M.mediaId = TV.mediaId WHERE TV.TVSerieName='" + media.TVSerieName + "';";
        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getMovies(): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM Movie INNER JOIN Media ON Media.mediaId = Movie.mediaId;";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getSeriesWithGenrePreference(user: User, media: Media): Promise<any> {
        let result = null;

        //let sqlQuery = "SELECT DISTINCT TV.* FROM TVSeriesEpisode TV, MediaHasGenre MHG WHERE MHG.mediaId = TV.mediaId AND MHG.genreId = '" + genre.genreId + "';";
        //let sqlQuery = "SELECT M.*, TV.*, W.* FROM TVSeriesEpisode TV, Media M, Watch W WHERE M.mediaId = TV.mediaId AND W.mediaId=M.mediaId AND TV.TVSerieName='" + media.TVSerieName + "' AND W.username='" + user.username + "'ORDER BY W.timeStamp DESC;";
        let sqlQuery = "SELECT M.*, TV.* FROM TVSeriesEpisode TV INNER JOIN Media M ON M.mediaId = TV.mediaId WHERE TV.TVSerieName='" + media.TVSerieName + "' ORDER BY TV.seasonNumber ASC, TV.episodeNumber ASC;";
        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getMoviesWithGenrePreference(user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT DISTINCT M.* FROM Media M, MediaHasGenre MHG WHERE MHG.mediaId = M.mediaId AND MHG.genreId IN ( SELECT GP.genreId FROM GenrePreference GP WHERE GP.username = '" + user.username +"' ) AND M.mediaID in ( SELECT mediaId FROM Movie);";
        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getAverageRating(media: Media): Promise<any> {
        let result = null;
        
        let sqlQuery = "SELECT M.mediaId, AVG(rate) as avgRate FROM Media M INNER JOIN MediaRating ON M.mediaId = MediaRating.mediaId WHERE M.mediaId = '" + media.mediaId + "' GROUP BY M.mediaId;";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getUserRating(media: Media, user: User): Promise<any> {
        let result = null;
        
        let sqlQuery = "SELECT MediaRating.* FROM Media M INNER JOIN MediaRating ON M.mediaId = MediaRating.mediaId WHERE MediaRating.username = '" + user.username + "' AND M.mediaId = '" + media.mediaId + "' GROUP BY M.mediaId;";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    /*public async getComments(): Promise<any> {
        Rapordaki SQL de bi problem var anlamadım commentliyorum simdilik
        let result = null;

        let sqlQuery = "SELECT * FROM Movie;";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
        
    }*/

    public async createMedia(media: Media, mediaGenres: Genre[]): Promise<any> {
        let result = null;
        let mediaId = id();
        let sqlQuery = "INSERT INTO Media VALUES('" + mediaId + "','" + media.publishUsername + "','" + media.name + "','" + media.description + "','" + media.path + "','" + media.duration + "', null);";

        try {
            await this.db.sendQuery(sqlQuery);
            console.log( "c await media ");  
            if(media.episodeNumber == null){ // it means it is a movie, then add to movie table
                console.log( "Creating movie...");
                sqlQuery = "INSERT INTO Movie VALUES('" + mediaId + "','" + media.oscarAward + "');";
            }
            else{ // it means it is a series, then add to series table
                console.log( "Creating tv show...");
                sqlQuery = "INSERT INTO TVSeriesEpisode VALUES('" + mediaId + "','" + media.TVSerieName + "','" + media.episodeNumber + "','" + media.seasonNumber + "','" + media.emmyAward + "');";
            }
            await this.db.sendQuery(sqlQuery);
            console.log( "Creating tv show2...");
            for (var i = 0; i < mediaGenres.length; i++)
            {
                console.log( "Creating tv show3...");
                sqlQuery = "INSERT INTO MediaHasGenre VALUES('" + mediaId + "','" + mediaGenres[i].genreId + "');";
                await this.db.sendQuery(sqlQuery);  
            }
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

    public async updateMedia(media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "UPDATE Media SET mediaId = '" + media.mediaId + "', publishUsername = '" +  media.publishUsername + "', name = '" + media.name + "', description = '" + media.description + "', path = '" + media.path + "', duration = '" + media.duration + "', null WHERE mediaId = '" + media.mediaId + "';";
        try {
            await this.db.sendQuery(sqlQuery);  
            if(media.episodeNumber == null){ // it means it is a movie, then add to movie table
                console.log( "Updating movie...");
                sqlQuery = "UPDATE Movie SET mediaId = '" + media.mediaId + "', oscarAward = '" +  media.oscarAward + "' WHERE mediaId = '" + media.mediaId + "';";
            }
            else
            { // it means it is a series, then add to series table
                console.log( "Updating tv show...");
                sqlQuery = "UPDATE TVSeriesEpisode SET mediaId = '" + media.mediaId + "', TVSerieName = '" +  media.TVSerieName + "', episodeNumber = '" + media.episodeNumber + "', seasonNumber = '" + media.seasonNumber + "', emmyAward = '" + media.emmyAward + "' WHERE mediaId = '" + media.mediaId + "';";
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

    public async getMediaComments(media: Media): Promise<any> {
        let result: Comment[] = [];
        let sqlQuery = "SELECT * FROM (SELECT * FROM Comment WHERE mediaId='" + media.mediaId + "' AND commentId NOT IN ( SELECT childId FROM SubComment) ) temp LEFT OUTER JOIN SubComment ON temp.commentId=SubComment.parentId ORDER BY timeStamp DESC;";
        try {
            let parentComments = await this.db.sendQuery(sqlQuery);
            sqlQuery = "SELECT * FROM Comment WHERE mediaId='" + media.mediaId + "' AND commentId IN ( SELECT childId FROM SubComment) ORDER BY timeStamp ASC;";
            let childComments = await this.db.sendQuery(sqlQuery);
            let childCommentDict = {}
            for(let i = 0 ; i < childComments.length ; i++){
                childCommentDict[childComments[i].commentId] = commentMapping.map(childComments[i]);
            }
            for(let i = 0 ; i < parentComments.length ; i++){
                let id = parentComments[i].commentId;
                let found = false;
                for(let j = 0 ; j < result.length ; j++){
                    if(result[j].commentId == id){
                        found = true;
                        result[j].subComments.push(childCommentDict[parentComments[i].childId]);
                    }
                }
                if(!found){
                    let newComment = commentMapping.map(parentComments[i]);
                    newComment.subComments = [];
                    if(parentComments[i].childId != null){
                        newComment.subComments.push(childCommentDict[parentComments[i].childId])
                    }
                    result.push(newComment);
                }
            }
            console.log(result);
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

   public async deleteMedia(media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM Media WHERE mediaId = '" + media.mediaId + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }   

    public async search(media: Media, genre: Genre): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT M.*, NULL, TV.episodeNumber, TV.seasonNumber, TV.emmyAward, 1 as type FROM Media M, TVSeriesEpisode TV WHERE M.name LIKE '" + media.name + "%' AND M.mediaId = TV.mediaId AND '" + genre.title + "' IN " 
        + "(SELECT Genre.title FROM MediaHasGenre INNER JOIN Genre ON MediaHasGenre.genreId = Genre.genreId WHERE TV.mediaId = MediaHasGenre.mediaId);";

        try {
            result = await this.db.sendQuery(sqlQuery);
            sqlQuery = "SELECT M.*, MO.oscarAward, NULL, NULL, NULL, 0 as type FROM Media M, Movie MO WHERE M.name LIKE '" + media.name + "%' AND M.mediaId = MO.mediaId AND '" + genre.title + "' IN " 
            + "(SELECT Genre.title FROM MediaHasGenre INNER JOIN Genre ON MediaHasGenre.genreId = Genre.genreId WHERE MO.mediaId = MediaHasGenre.mediaId);";
            let movieResult = await this.db.sendQuery(sqlQuery);
            for(let i = 0 ; i < movieResult.length ; i++){
                result.push(movieResult[i]);
            }
        } 
        catch(err){
            console.log( err);
            throw err;
        }
        return result;
    }   

    public async addGenreToMedia(media: Media, genre: Genre): Promise<any> {
        let result = null;
        let sqlQuery = "INSERT INTO MediaHasGenre VALUES('" + media.mediaId + "','" + genre.genreId + "');";
        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }  

    public async deleteGenreFromMedia(media: Media, genre: Genre): Promise<any> {
        let result = null;
        let sqlQuery = "DELETE FROM MediaHasGenre WHERE mediaId='" + media.mediaId + "' AND genreId='" + genre.genreId + "';";
        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }  

    public async getWatch(media: Media, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT Progress FROM Watch WHERE mediaId = '" + media.mediaId + "' AND username = '" + user.username + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }   

    public async initializeWatch(media: Media, user: User): Promise<any> {
        let result = null;
        console.log( "Initializing watch!");
        let sqlQuery = "INSERT INTO Watch VALUES('" + user.username + "', '" + media.mediaId + "', '0', null);"

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        console.log( "query success!");
        return result;
    }   

    public async watch(media: Media, user: User): Promise<any> {
        let result = null;
        console.log( "watching");
        let sqlQuery = "UPDATE Watch SET Progress = Progress + 1, timeStamp = CURRENT_TIMESTAMP WHERE mediaId = '" + media.mediaId + "' AND username = '" + user.username + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }
    
    public async partyWatch(username: string, mediaId: string, progress: number): Promise<any> {
        let result = null;
        console.log( "watching");
        let sqlQuery = "SELECT * FROM Watch WHERE username='" + username + "' AND mediaId='" + mediaId + "';"

        try {
            let watchCheck = await this.db.sendQuery(sqlQuery);
            if(watchCheck.length == 0){
                sqlQuery = "INSERT INTO Watch VALUES('" + username + "', '" + mediaId + "', '" + progress + "', null);";
                await this.db.sendQuery(sqlQuery);
            }
            else{
                sqlQuery = "UPDATE Watch SET Progress = '" + progress + "', timeStamp = null WHERE mediaId = '" + mediaId + "' AND username = '" + username + "';";
                await this.db.sendQuery(sqlQuery);
            }
        } 
        catch(err){
            throw err;
        }
        return result;
    }
    
    public async rate(media: Media, user: User, rate: number): Promise<any> {
        let result = null;
        let sqlQuery = "SELECT * FROM MediaRating WHERE username = '" + user.username + "' AND mediaId = '" + media.mediaId + "';";
        try {
            result = await this.db.sendQuery(sqlQuery);
            if (result.length > 0)
            {
                sqlQuery = "UPDATE MediaRating SET rate = '" + rate + "' WHERE username = '" + user.username + "' AND mediaId = '" + media.mediaId + "';";
            }
            else
            {
                sqlQuery = "INSERT INTO MediaRating VALUES('" + user.username + "', '" + media.mediaId + "', '" + rate + "');";
            }
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }  

    public async getSuggestionForMedia(media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT DISTINCT M.* FROM MediaHasGenre MG, Media M WHERE MG.genreId IN (SELECT genreId FROM MediaHasGenre WHERE mediaId = '" + media.mediaId + "') AND M.mediaId=MG.mediaId AND M.mediaId!='" + media.mediaId + "'";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getSuggestionForChannel(channel: Channel): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT DISTINCT M.*, episodeNumber FROM (MediaHasGenre MG, Media M) LEFT OUTER JOIN TVSeriesEpisode ON TVSeriesEpisode.mediaId = M.mediaId WHERE MG.genreId IN (SELECT genreId FROM ChannelHasGenre WHERE channelId = '" + channel.channelId + "') AND M.mediaId=MG.mediaId AND M.mediaId NOT IN (SELECT mediaId from ChannelMedia WHERE channelId='" + channel.channelId + "');";
        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    /*public async deleteSerie(serie: Media): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM TVSeriesEpisode WHERE mediaId = '" + serie.mediaId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }   

    public async deleteMovie(movie: Media): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM Movie WHERE mediaId = '" + movie.mediaId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }*/

    public async getGenres(): Promise<any>
    {
        let result = null;

        let sqlQuery = "SELECT * FROM Genre;";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getMediaGenres(media: Media): Promise<any>
    {
        let result = null;

        let sqlQuery = "SELECT Genre.genreId, Genre.title FROM MediaHasGenre INNER JOIN Genre ON MediaHasGenre.genreId = Genre.genreId WHERE MediaHasGenre.mediaId = '" + media.mediaId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }
}