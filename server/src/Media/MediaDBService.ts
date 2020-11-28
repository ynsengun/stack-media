import { User } from "Model/User/User";
import { Media } from "Model/Media/Media";
import { connected } from "process";
import { compileFunction } from "vm";
import {Database} from "../Database";
import * as util from "util";

export class MediaDBService {

    db: Database;

    constructor(){
        this.db = new Database();
    }

    public async getMedia(media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM Media WHERE mediaId = '" + media.mediaId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }


    public async getSeries(): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM TV-Series-Episode;";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getMovies(): Promise<any> {
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
    }

    public async getRating(media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT M.mediaId AVG(rate) FROM Media M INNER JOIN MediaRating ON M.media-id = MediaRating.media-id WHERE M.mediaId = '" + media.mediaId + "' GROUP BY M.media-id;";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getComments(): Promise<any> {
        /* Rapordaki SQL de bi problem var anlamadım commentliyorum simdilik
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
        */
    }

    public async createMedia(media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "INSERT INTO Media VALUES('" + media.mediaId + "','" + media.publishUserId + "','" + media.name + "','" + media.description + "','" + media.path + "','" + media.uploadDate + "');";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async createSerie(serie: TVSeriesEpisode): Promise<any> {
        let result = null;

        let sqlQuery = "INSERT INTO TV-Series-Episode VALUES('" + serie.mediaId + "','" + serie.episodeNo + "','" + serie.seasonNo + "','" + serie.emmy + "');";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async createMovie(movie: Movie): Promise<any> {
        let result = null;

        let sqlQuery = "INSERT INTO Movie VALUES('" + movie.mediaId + "','" + movie.oscar + "');";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

   public async deleteMedia(media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM Media WHERE mediaId = '" + media.mediaId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }   

    public async deleteSerie(serie: Media): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM TV-Series-Episode WHERE mediaId = '" + serie.mediaId + "';";

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
    }   
    

   public async search(media: Media, genre: Genre): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT * FROM Media M WHERE DIFFERENCE(M.name, '" + media.name + "') = 4 AND '" + genre.title + "' in " 
        + "(SELECT Genre.title FROM HasGenre INNER JOIN Genre ON HasGenre.genreId = Genre.genreId WHERE M.mediaId = HasGenre.mediaId) ORDER BY M.name DESC;";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }   

    public async getWatch(media: Media, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT progress FROM Watch WHERE media-id = '" + media.mediaId + "' AND username = '" + user.username + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }   

    public async watch(media: Media, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "UPDATE Watch SET progress = cachedProgress + 1, time-stamp = TIMESTAMP() WHERE MediaId = '" + media.mediaId + "' AND userId = '" + user.username + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }   

    public async getSuggestionForMedia(media: Media, user: User): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT M.name FROM GenrePreference GP, HasGenre HG, Media WHERE GP.username = '" + user.username + "' and GP.genre-id = HG.genre-id and  HG.media-id = M.media-id;";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }   
}