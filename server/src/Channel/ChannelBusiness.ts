import { ResponseModel } from "Model/Response/ResponseModel";
import {SuccessResponse} from "../Model/Response/SuccessResponse";
import {ErrorResponse} from "../Model/Response/ErrorResponse";
import {ChannelDBService} from "./ChannelDBService";
import { Media } from "../Model/Media/Media";
import { Genre } from "../Model/Genre/Genre";
import { Channel } from "../Model/Channel/Channel";

export class ChannelBusiness {

    private channelDBService: ChannelDBService;

    constructor(){
        this.channelDBService = new ChannelDBService();
    }

    public async getMediasFromChannel(channel: Channel): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.getMediasFromChannel(channel);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getMoviesFromChannel(channel: Channel): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.getMoviesFromChannel(channel);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getSeriesFromChannel(channel: Channel): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.getSeriesFromChannel(channel);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getMovieSuggestionForChannel(channel: Channel): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.getMovieSuggestionForChannel(channel);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getSeriesSuggestionForChannel(channel: Channel): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.getSeriesSuggestionForChannel(channel);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async addGenreToChannel(channel: Channel, genre: Genre): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.addGenreToChannel(channel, genre);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async deleteGenreFromChannel(channel: Channel, genre: Genre): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.deleteGenreFromChannel(channel, genre);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getGenresFromChannel(channel: Channel): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.getGenresFromChannel(channel);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async addMediaToChannel(channel: Channel, media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.addMediaToChannel(channel, media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async deleteMediaFromChannel(channel: Channel, media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.deleteMediaFromChannel(channel, media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async createChannel(channel: Channel): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.createChannel(channel);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async deleteChannel(channel: Channel): Promise<ResponseModel>
    {
        try {
            let result = await this.channelDBService.deleteChannel(channel);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }
}