import { User } from "Model/User/User";
import { Media } from "Model/Media/Media";
import { Channel } from "Model/Channel/Channel";
import { connected } from "process";
import { compileFunction } from "vm";
import {Database} from "../Database";
import * as util from "util";

export class ChannelDBService {
    db: Database;

    constructor(){
        this.db = new Database();
    }

    public async getMoviesFromChannel(channel: Channel): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT MO.* FROM Media M, ChannelMeadia CM, Movie MO WHERE ChannelMedia.channelId = '" + channel.channelId + "' AND M.mediaId = CM.mediaId AND M.mediaId = MO.mediaId;";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getSeriesFromChannel(channel: Channel): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT TV.* FROM Media M, ChannelMeadia CM, TVSeriesEpisode TV WHERE ChannelMedia.channelId = '" + channel.channelId + "' AND M.mediaId = CM.mediaId AND M.mediaId = TV.mediaId;";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getMovieSuggestionForChannel(channel: Channel): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT MO.* FROM Media M, MediaHasGenre MHG, Movie MO WHERE M.mediaId = MHG.mediaId AND M.mediaId = MO.mediaId AND MHG.genreId IN" 
                     + "(SELECT genreId FROM ChannelHasGenre WHERE channelId = '" + channel.channelId + "');";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async getSeriesSuggestionForChannel(channel: Channel): Promise<any> {
        let result = null;

        let sqlQuery = "SELECT TV.* FROM Media M, MediaHasGenre MHG, TVSeriesEpisode TV WHERE M.mediaId = MHG.mediaId AND M.mediaId = MO.mediaId AND MHG.genreId IN" 
                     + "(SELECT genreId FROM ChannelHasGenre WHERE channelId = '" + channel.channelId + "');";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async addGenreToChannel(channel: Channel, genre: Genre): Promise<any> {
        let result = null;

        let sqlQuery = "INSERT INTO ChannelHasGenre VALUES('" + channel.channelId + "', '" + genre.genreId + "');";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async deleteGenreFromChannel(channel: Channel, genre: Genre): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM ChannelHasGenre WHERE channelId = '" + channel.channelId + "' AND genreId = '" + genre.genreId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async addMediaToChannel(channel: Channel, media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "INSERT INTO ChannelMedia VALUES('" + media.mediaId + "', '" + channel.channelId + "');";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async deleteMediaFromChannel(channel: Channel, media: Media): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM ChannelMedia WHERE channelId = '" + media.mediaId + "' AND genreId = '" + channel.channelId + "';";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async createChannel(channel: Channel): Promise<any> {
        let result = null;

        let sqlQuery = "INSERT INTO Channel VALUES('" + channel.channelId + "', '" + channel.username + "', '" + channel.title + "');";

        try {
            result = await this.db.sendQuery(sqlQuery);
            // TODO
        } 
        catch(err){
            throw err;
        }
        return result;
    }

    public async deleteChannel(channel: Channel): Promise<any> {
        let result = null;

        let sqlQuery = "DELETE FROM Channel WHERE channelId = '" + channel.channelId + "' AND username = '" + channel.username + "';";

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