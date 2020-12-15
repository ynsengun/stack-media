import { User } from "Model/User/User";
import { Media } from "Model/Media/Media";
import { Genre } from "Model/Genre/Genre";
import {Database} from "../Database";
import {AlreadyExist} from "../Model/Error/AlreadyExist";
import {v1 as id} from "uuid";

export class MediaDBService {

    db: Database;

    constructor(){
        this.db = new Database();
    }

    public async getMedia(media: Media): Promise<any> {
        let result = null;
        let sqlQuery = "SELECT M.*, NULL, TV.episodeNumber, TV.seasonNumber, TV.emmyAward, 1 as type FROM Media M, TVSeriesEpisode TV WHERE M.mediaId = '" + media.mediaId + "' AND M.mediaId = TV.mediaId;";
        //let sqlQuery = "SELECT * FROM Media WHERE mediaId = '" + media.mediaId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            sqlQuery = "SELECT M.*, MO.oscarAward, NULL, NULL, NULL, 0 as type FROM Media M, Movie MO WHERE M.mediaId = '" + media.mediaId + "' AND M.mediaId = MO.mediaId;";
            let movieResult = await this.db.sendQuery(sqlQuery);
            result.push(movieResult);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getSeries(): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM TVSeriesEpisode;";

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

    public async getSeriesWithGenrePreference(genre: Genre): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT TV.* FROM TVSeriesEpisode TV, MediaHasGenre MHG WHERE MHG.mediaId = TV.mediaId AND MHG.genreId = '" + genre.genreId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getMoviesWithGenrePreference(genre: Genre): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT M.* FROM Movie M, MediaHasGenre MHG WHERE MHG.mediaId = M.mediaId AND MHG.genreId = '" + genre.genreId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getRating(media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT M.mediaId AVG(rate) FROM Media M INNER JOIN MediaRating ON M.mediaId = MediaRating.media-id WHERE M.mediaId = '" + media.mediaId + "' GROUP BY M.mediaId;";

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
        let sqlQuery = "INSERT INTO Media VALUES('" + mediaId + "','" + media.publishUsername + "','" + media.name + "','" + media.description + "','" + media.path + "','" + media.duration + "','" + media.uploadDate + "');";

        try {
            await this.db.sendQuery(sqlQuery);  
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
            result.push(movieResult);
        } 
        catch(err){
            console.log( err);
            throw err;
        }
        return result;
    }   

    public async getWatch(media: Media, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT progress FROM Watch WHERE mediaId = '" + media.mediaId + "' AND username = '" + user.username + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }   

    public async watch(media: Media, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "UPDATE Watch SET progress = cachedProgress + 1, time-stamp = TIMESTAMP() WHERE MediaId = '" + media.mediaId + "' AND username = '" + user.username + "';";

        try {
            await this.db.sendQuery(sqlQuery);
        } 
        catch(err){
            throw err;
        }
        return result;
    }   

    public async getSuggestionForMedia(media: Media, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT M.name FROM GenrePreference GP, HasGenre HG, Media WHERE GP.username = '" + user.username + "' and GP.genreId = HG.genreId and  HG.mediaId = M.mediaId;";

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