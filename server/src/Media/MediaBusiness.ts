import { ResponseModel } from "Model/Response/ResponseModel";
import {SuccessResponse} from "../Model/Response/SuccessResponse";
import {ErrorResponse} from "../Model/Response/ErrorResponse";
import {MediaDBService} from "./MediaDBService";
import { User } from "../Model/User/User";
import { Media } from "../Model/Media/Media";
import { Genre } from "../Model/Genre/Genre";
import { Channel } from "../Model/Channel/Channel";

export class MediaBusiness {

    private mediaDBService: MediaDBService;

    constructor(){
        this.mediaDBService = new MediaDBService();
    }

    public async getMedia(media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getMedia(media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }


    public async getSeries(user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getSeries(user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getSerie(user: User, media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getSerie(user, media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getMovies(): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getMovies();
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getSeriesWithGenrePreference(user: User, media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getSeriesWithGenrePreference(user, media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getMoviesWithGenrePreference(user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getMoviesWithGenrePreference(user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async addGenreToMedia(media: Media, genre: Genre): Promise<ResponseModel>{
        try {
            let result = await this.mediaDBService.addGenreToMedia(media, genre);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async deleteGenreFromMedia(media: Media, genre: Genre): Promise<ResponseModel>{
        try {
            let result = await this.mediaDBService.deleteGenreFromMedia(media, genre);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getAverageRating(media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getAverageRating(media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getUserRating(media: Media, user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getUserRating(media, user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async createMedia(media: Media, mediaGenres: Genre[]): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.createMedia(media, mediaGenres);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async updateMedia(media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.updateMedia(media);
            console.log( "E YO!");
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getMediaComments(media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getMediaComments(media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async deleteMedia(media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.deleteMedia(media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async search(media: Media, genre: Genre, endDate: Date): Promise<ResponseModel>
   {
       try {
           let result = await this.mediaDBService.search(media, genre, endDate);
           return new SuccessResponse(result);
       } catch (error) {
           return new ErrorResponse(error);
       }
   }

   public async getWatch(media: Media, user: User): Promise<ResponseModel>
   {
       try {
           let result = await this.mediaDBService.getWatch(media, user);
           return new SuccessResponse(result);
       } catch (error) {
           return new ErrorResponse(error);
       }
   }

   public async initializeWatch(media: Media, user: User): Promise<ResponseModel>
   {
       try {
           let result = await this.mediaDBService.initializeWatch(media, user);
           return new SuccessResponse(result);
       } catch (error) {
           return new ErrorResponse(error);
       }
   }

    public async watch(media: Media, user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.watch(media, user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async rate(media: Media, user: User, rate: number): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.rate(media, user, rate);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getSuggestionForMedia(media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getSuggestionForMedia(media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getSuggestionForChannel(channel: Channel): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getSuggestionForChannel(channel);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

   /*public async getComments(): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getComments();
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }*/
    /*
    public async createSerie(serie: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.createSerie(serie);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async createMovie(movie: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.createMovie(movie);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }
    */
    

   /*
   public async deleteSerie(serie: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.deleteSerie(serie);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async deleteMovie(movie: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.deleteMovie(movie);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }*/

    public async getMediaGenres( media: Media): Promise<any>
    {
        try {
            let result = await this.mediaDBService.getMediaGenres( media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getGenres(): Promise<any>
    {
        try {
            let result = await this.mediaDBService.getGenres();
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }
}