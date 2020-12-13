import {Request, Response} from "express";
import {UserBusiness} from "./User/UserBusiness";
import {MediaBusiness} from "./Media/MediaBusiness";
import {ChannelBusiness} from "./Channel/ChannelBusiness";
import {Validation} from "./Service/Validation";
import {ErrorResponse} from "./Model/Response/ErrorResponse";
import userMapping from "./Service/UserMapping";
import mediaMapping from "./Service/MediaMapping";
import commentMapping from "./Service/CommentMapping";
import channelMapping from "./Service/ChannelMapping";
import genreMapping from "./Service/GenreMapping";

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

    public async getParties(request: Request, response: Response): Promise<void> {
        try{
            let result = await this.userBusiness.getParties(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async addComment(request: Request, response: Response): Promise<void> {
        try{
            this.validation.addCommentValidation(request);
            let result = await this.userBusiness.addComment(userMapping.map(request.body), mediaMapping.map(request.body), commentMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getChannels(request: Request, response: Response): Promise<void> {
        try{
            let result = await this.userBusiness.getChannels(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getFriendActivities(request: Request, response: Response): Promise<void> {
        try{
            let result = await this.userBusiness.getFriendActivities(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async rateMedia(request: Request, response: Response): Promise<void> {
        try{
            this.validation.rateMediaValidation(request);
            let result = await this.userBusiness.rateMedia(userMapping.map(request.body), mediaMapping.map(request.body), request.body.rate);
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteComment(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteCommentValidation(request);
            let result = await this.userBusiness.deleteComment(commentMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async addGenre(request: Request, response: Response): Promise<void> {
        try{
            this.validation.addGenreValidation(request);
            let result = await this.userBusiness.addGenre(userMapping.map(request.body), genreMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteGenre(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteGenreValidation(request);
            let result = await this.userBusiness.addGenre(userMapping.map(request.body), genreMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async changePassword(request: Request, response: Response): Promise<void> {
        try{
            this.validation.changePasswordValidation(request);
            let result = await this.userBusiness.changePassword(userMapping.map(request.body), request.body.newPassword);
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async changeInfo(request: Request, response: Response): Promise<void> {
        try{
            this.validation.changeInfoValidation(request);
            let result = await this.userBusiness.changeInfo(userMapping.map(request.body), request.body.newUsername, request.body.newEmail, request.body.newUserType);
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

    /* new comment

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

    // media functions


    */
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

    public async getMoviesWithGenrePreference(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getMoviesWithGenrePreferenceValidation(request);
            let result = await this.mediaBusiness.getMoviesWithGenrePreference(genreMapping.map(request.body.genre));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getSeriesWithGenrePreference(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getSeriesWithGenrePreferenceValidation(request);
            let result = await this.mediaBusiness.getSeriesWithGenrePreference(genreMapping.map(request.body.genre));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getRating(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getRatingValidation(request);
            let result = await this.mediaBusiness.getRating(mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getGenres(request: Request, response: Response): Promise<void> {
        try{
            let result = await this.mediaBusiness.getGenres();
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    /*public async getComments(request: Request, response: Response): Promise<void> {
        try{
            let result = await this.mediaBusiness.getComments();
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }*/
    
    public async createMedia(request: Request, response: Response): Promise<void> {
        try{
            this.validation.createMediaValidation(request);
            let genreList = [];
            let requestGenres = request.body.genres;
            for (var i = 0; i < requestGenres.length; i++)
            {
                genreList.push(genreMapping.map(requestGenres[i]));
            }
            let result = await this.mediaBusiness.createMedia(mediaMapping.map(request.body), genreList);
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

    public async search(request: Request, response: Response): Promise<void> {
        try{
            this.validation.searchValidation(request);
            let result = await this.mediaBusiness.search(mediaMapping.map(request.body), genreMapping.map(request.body));
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
            let result = await this.mediaBusiness.getSuggestionForMedia(mediaMapping.map(request.body), userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
    
    /*

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
    }*/

    // channel functions

    public async getMoviesFromChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getMoviesFromChannelValidation(request);
            let result = await this.channelBusiness.getMoviesFromChannel(channelMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getSeriesFromChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getSeriesFromChannelValidation(request);
            let result = await this.channelBusiness.getSeriesFromChannel(channelMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getMovieSuggestionForChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getMovieSuggestionForChannelValidation(request);
            let result = await this.channelBusiness.getMovieSuggestionForChannel(channelMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
        
    public async getSeriesSuggestionForChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.getSeriesSuggestionForChannelValidation(request);
            let result = await this.channelBusiness.getSeriesSuggestionForChannel(channelMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    } 

    public async addGenreToChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.addGenreToChannelValidation(request);
            let result = await this.channelBusiness.addGenreToChannel(channelMapping.map(request.body), genreMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteGenreFromChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteGenreFromChannelValidation(request);
            let result = await this.channelBusiness.deleteGenreFromChannel(channelMapping.map(request.body), genreMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
    
    public async addMediaToChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.addMediaToChannelValidation(request);
            let result = await this.channelBusiness.addMediaToChannel(channelMapping.map(request.body), mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteMediaFromChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteMediaFromChannelValidation(request);
            let result = await this.channelBusiness.deleteMediaFromChannel(channelMapping.map(request.body), mediaMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async createChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.createChannelValidation(request);
            let result = await this.channelBusiness.createChannel(channelMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteChannel(request: Request, response: Response): Promise<void> {
        try{
            this.validation.deleteChannelValidation(request);
            let result = await this.channelBusiness.deleteChannel(channelMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
}