import { ResponseModel } from "Model/Response/ResponseModel";
import {SuccessResponse} from "../Model/Response/SuccessResponse";
import {ErrorResponse} from "../Model/Response/ErrorResponse";
import {MediaDBService} from "./MediaDBService";
import { User } from "../Model/User/User";
import { Media } from "../Model/Media/Media";

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

    public async getSeries(): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getSeries();
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

    public async getRating(media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getRating(media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getComments(): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getComments();
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async createMedia(media: Media): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.createMedia(media);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

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
    

   public async deleteMedia(media: Media): Promise<ResponseModel>
   {
       try {
           let result = await this.mediaDBService.deleteMedia(media);
           return new SuccessResponse(result);
       } catch (error) {
           return new ErrorResponse(error);
       }
   }

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
    }

   public async search(media: Media, genre: Genre): Promise<ResponseModel>
   {
       try {
           let result = await this.mediaDBService.search(media, genre);
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

   public async watch(media: Media, user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.watch(media, user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getSuggestionForMedia(media: Media, user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.mediaDBService.getSuggestionForMedia(media, user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }
}