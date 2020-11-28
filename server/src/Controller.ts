import {Request, Response} from "express";
import {UserBusiness} from "./User/UserBusiness";
import {MediaBusiness} from "./Media/MediaBusiness";
import {ChannelBusiness} from "./Channel/ChannelBusiness";
import {Validation} from "./Service/Validation";
import {ErrorResponse} from "./Model/Response/ErrorResponse";
import userMapping from "./Service/UserMapping";
import mediaMapping from "./Service/MediaMapping";

export class Controller{

    private userBusiness: UserBusiness;
    private channelBusiness: ChannelBusiness;
    private mediaBusiness: MediaBusiness;
    private validation: Validation;

    constructor() {
        this.userBusiness = new UserBusiness();
        this.channelBusiness = new ChannelBusiness();
        this.mediaBusiness = new MediaBusiness();
        this.validation = new Validation();
    }


    // user functions
    public async login(request: Request, response: Response): Promise<void> {
        try{
            this.validation.loginValidation(request);
            let result = await this.userBusiness.login(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }

    }

    public async register(request: Request, response: Response): Promise<void> {
        try{
            this.validation.registerValidation(request);
            let result = await this.userBusiness.register(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    /* CHANGE THEM
    public async logout(request: Request, response: Response): Promise<void> {
        try{
            this.validation.logoutValidation(request);
            let result = await this.userBusiness.logout(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
    */
    public async getParties(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getPartiesValidation(request);
            let result = await this.userBusiness.getParties(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getChannels(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getChannelsValidation(request);
            let result = await this.userBusiness.getChannels(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
    
    public async getFriendActivities(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getFriendActivities(request);
            let result = await this.userBusiness.getFriendActivities(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async addFriend(request: Request, response: Response): Promise<void> {
        try{
            this.validation.addFriendValidation(request);
            let result = await this.userBusiness.addFriend(userMapping.map(request.body), request.body.invitedUsername);
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteFriend(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteFriendValidation(request);
            let result = await this.userBusiness.deleteFriend(userMapping.map(request.body), request.body.deletedUsername);
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async rateMedia(request: Request, response: Response): Promise<void> {
        try{
            this.validation.rateMediaValidation(request);
            let result = await this.userBusiness.rateMedia(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async addComment(request: Request, response: Response): Promise<void> {
        try{
            this.validation.addCommentValidation(request);
            let result = await this.userBusiness.addComment(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
    
    public async deleteComment(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteCommentValidation(request);
            let result = await this.userBusiness.deleteComment(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    /*
    public async addGenre(request: Request, response: Response): Promise<void> {
        try{
            this.validation.addGenreValidation(request);
            let result = await this.userBusiness.addGenre(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteGenre(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteGenreValidation(request);
            let result = await this.userBusiness.deleteGenre(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async changePassword(request: Request, response: Response): Promise<void> {
        try{
            this.validation.changePasswordValidation(request);
            let result = await this.userBusiness.changePassword(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async changeInfo(request: Request, response: Response): Promise<void> {
        try{
            this.validation.changeInfoValidation(request);
            let result = await this.userBusiness.changeInfo(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
    */
    // media functions


    public async getMedia(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getMediaValidation(request);
            let result = await this.mediaBusiness.getMedia(mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getMovies(request: Request, response: Response): Promise<void> {
        try{
            let result = await this.mediaBusiness.getMovies();
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getSeries(request: Request, response: Response): Promise<void> {
        try{
            let result = await this.mediaBusiness.getSeries();
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
    
    public async createMedia(request: Request, response: Response): Promise<void> {
        try{
            this.validation.createMediaValidation(request);
            let result = await this.mediaBusiness.createMedia(mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async createSerie(request: Request, response: Response): Promise<void> {
        try{
            this.validation.createSerieValidation(request);
            let result = await this.mediaBusiness.createSerie(mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async createMovie(request: Request, response: Response): Promise<void> {
        try{
            this.validation.createMovieValidation(request);
            let result = await this.mediaBusiness.createMovie(mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    
    public async deleteMedia(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteMediaValidation(request);
            let result = await this.mediaBusiness.deleteMedia(mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteSerie(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteSerieValidation(request);
            let result = await this.mediaBusiness.deleteSerie(mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteMovie(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteMovieValidation(request);
            let result = await this.mediaBusiness.deleteMovie(mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async search(request: Request, response: Response): Promise<void> {
        try{
            this.validation.searchValidation(request);
            let result = await this.mediaBusiness.search(mediaMapping.map(request.body), genreMapping.map(request));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }


    public async getWatch(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getWatchValidation(request);
            let result = await this.mediaBusiness.getWatch(mediaMapping.map(request.body), userMapping.map(request));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async watch(request: Request, response: Response): Promise<void> {
        try{
            this.validation.watchValidation(request);
            let result = await this.mediaBusiness.watch(mediaMapping.map(request.body), userMapping.map(request));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getSuggestionForMedia(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getSuggestionForMediaValidation(request);
            let result = await this.mediaBusiness.getSuggestionForMedia(mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
    /*
    // channel functions

    public async getMoviesFromChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getMoviesFromChannelValidation(request);
            let result = await this.channelBusiness.getMoviesFromChannel(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getSeriesFromChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getSeriesFromChannelValidation(request);
            let result = await this.channelBusiness.getSeriesFromChannel(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getMovieSuggestionForChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getMovieSuggestionForChannelValidation(request);
            let result = await this.channelBusiness.getMovieSuggestionForChannel(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
        
    public async getSeriesSuggestionForChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getSeriesSuggestionForChannelValidation(request);
            let result = await this.channelBusiness.getSeriesSuggestionForChannel(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    } 

    public async addGenreToChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.addGenreToChannelValidation(request);
            let result = await this.channelBusiness.addGenreToChannel(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteGenreFromChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteGenreFromChannelValidation(request);
            let result = await this.channelBusiness.deleteGenreFromChannel(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
    
    public async addMovieToChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.addMovieToChannelValidation(request);
            let result = await this.channelBusiness.addMovieToChannel(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async addSeriesToChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.addSeriesToChannelValidation(request);
            let result = await this.channelBusiness.addSeriesToChannel(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async createChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.createChannelValidation(request);
            let result = await this.channelBusiness.createChannel(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteChannelValidation(request);
            let result = await this.channelBusiness.deleteChannel(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }*/

}