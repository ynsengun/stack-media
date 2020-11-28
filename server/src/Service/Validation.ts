import {InvalidUserInformation} from "../Model/Error/InvalidUserInformation";
import {Request} from "express";

export class Validation{

    public loginValidation(req: Request): void {
        if(!req.body.email || !req.body.password)
            throw new InvalidUserInformation();
    }
    
    public registerValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }

    /*
    public logoutValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }*/

    public getPartiesValidation(req: Request): void {
        if(!req.body.username)
            throw new InvalidUserInformation();
    }

    public getChannelsValidation(req: Request): void {
        if(!req.body.username)
            throw new InvalidUserInformation();
    }

    public getFriendActivitiesValidation(req: Request): void {
        if(!req.body.username)
            throw new InvalidUserInformation();
    }

    public addFriendValidation(req: Request): void {
        if(!req.body.username || !req.body.invitedUsername)
            throw new InvalidUserInformation();
    }

    public deleteFriendValidation(req: Request): void {
        if(!req.body.username || !req.body.deletedUsername)
            throw new InvalidUserInformation();
    }

    public createMediaValidation(req: Request): void {
        if(!req.body.publishUserId || !req.body.name || !req.body.description || !req.body.path)
            throw new InvalidUserInformation();
    }

    public deleteMediaValidation(req: Request): void {
        if(!req.body.mediaId)
            throw new InvalidUserInformation();
    }

    public searchValidation(req: Request): void {
        if(!req.body.name || !req.body.title)
            throw new InvalidUserInformation();
    }

    public getMediaValidation(req: Request): void {
        if(!req.body.mediaId)
            throw new InvalidUserInformation();
    }

    public getWatchValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId)
            throw new InvalidUserInformation();
    }

    public watchValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId)
            throw new InvalidUserInformation();
    }

    public getSuggestionForMediaValidation(req: Request): void {
        if(!req.body.username)
            throw new InvalidUserInformation();
    }
    /*
    public rateMovieValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }
    public addCommentValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }
    public deleteCommentValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }
    public addGenreValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }
    public deleteGenreValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }
    public changePasswordValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }
    public changeInfoValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }

    // channel functions

    public getMoviesFromChannelValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }

    public getSeriesFromChannelValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }

    public getMovieSuggestionForChannelValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }
        
    public getSeriesSuggestionForChannelValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }

    public addGenreToChannelValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }

    public deleteGenreFromChannelValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }
    
    public addMovieToChannelValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }

    public addSeriesToChannelValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }

    public createChannelValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }

    public deleteChannelValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }
    */
}