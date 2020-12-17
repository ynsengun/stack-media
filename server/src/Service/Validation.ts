import {InvalidRequest} from "../Model/Error/InvalidRequest";
import {Request} from "express";

export class Validation{

    public loginValidation(req: Request): void {
        if(!req.body.username || !req.body.password)
            throw new InvalidRequest();
    }
    
    public registerValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidRequest();
    }

    /*
    public logoutValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidRequest();
    }*/

    public addFriendValidation(req: Request): void {
        if(!req.body.username || !req.body.invitedUsername)
            throw new InvalidRequest();
    }

    public deleteFriendValidation(req: Request): void {
        if(!req.body.username || !req.body.deletedUsername)
            throw new InvalidRequest();
    }

    public createMediaValidation(req: Request): void {
        if(!req.body.publishUsername || !req.body.name || !req.body.description || !req.body.path)
            throw new InvalidRequest();
    }

    public updateMediaValidation(req: Request): void {
        if(!req.body.publishUsername || !req.body.name || !req.body.description || !req.body.path)
            throw new InvalidRequest();
    }

    public getMediaCommentsValidation(req: Request): void {
        if(!req.body.mediaId)
            throw new InvalidRequest();
    }

    public deleteMediaValidation(req: Request): void {
        if(!req.body.mediaId)
            throw new InvalidRequest();
    }

    public searchValidation(req: Request): void {
        if(!req.body.name || !req.body.title)
            throw new InvalidRequest();
    }

    public addGenreToMediaValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId || !req.body.genreId)
            throw new InvalidRequest();
    }

    public deleteGenreFromMediaValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId || !req.body.genreId)
            throw new InvalidRequest();
    }

    public getMediaValidation(req: Request): void {
        if(!req.body.mediaId)
            throw new InvalidRequest();
    }

    public getSerieValidation(req: Request): void {
        if(!req.body.TVSerieName)
            throw new InvalidRequest();
    }

    public getMoviesWithGenrePreferenceValidation(req: Request): void {
        if(!req.body.username)
            throw new InvalidRequest();
    }

    public getSeriesWithGenrePreferenceValidation(req: Request): void {
        if(!req.body.username || !req.body.TVSerieName)
            throw new InvalidRequest();
    }

    public getWatchValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId)
            throw new InvalidRequest();
    }

    public initializeWatchValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId)
            throw new InvalidRequest();
    }

    public watchValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId)
            throw new InvalidRequest();
    }

    public rateValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId || !req.body.rate)
            throw new InvalidRequest();
    }

    public getSuggestionForMediaValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId)
            throw new InvalidRequest();
    }

    public getSuggestionForChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.channelId)
            throw new InvalidRequest();
    }

    public addCommentValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId || !req.body.text)
            throw new InvalidRequest();
    }

    public rateMediaValidation(req: Request): void {
        if(!req.body.username || !req.body.rate || !req.body.mediaId)
            throw new InvalidRequest();
    }

    public getAverageRatingValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId)
            throw new InvalidRequest();
    }
    
    public getUserRatingValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId)
            throw new InvalidRequest();
    }


    public deleteCommentValidation(req: Request): void {
        if(!req.body.username || !req.body.commentId)
            throw new InvalidRequest();
    }

    public addGenreValidation(req: Request): void {
        if(!req.body.username || !req.body.genreId)
            throw new InvalidRequest();
    }
    public deleteGenreValidation(req: Request): void {
        if(!req.body.username || !req.body.genreId)
            throw new InvalidRequest();
    }

    public changePasswordValidation(req: Request): void {
        if(!req.body.username || !req.body.password || !req.body.newPassword)
            throw new InvalidRequest();
    }

    public changeInfoValidation(req: Request): void {
        if(!req.body.username || !req.body.newUsername || !req.body.newUserType || !req.body.newEmail)
            throw new InvalidRequest();
    }

    public acceptFriendshipInvitationValidation(req: Request): void {
        if(!req.body.username || !req.body.inviterUsername)
            throw new InvalidRequest();
    }

    public refuseFriendshipInvitationValidation(req: Request): void {
        if(!req.body.username || !req.body.inviterUsername)
            throw new InvalidRequest();
    }

    public removeFriendValidation(req: Request): void {
        if(!req.body.username || !req.body.friendUsername)
            throw new InvalidRequest();
    }
    
    public sendFriendshipInvitationValidation(req: Request): void {
        if(!req.body.username || !req.body.invitedUsername)
            throw new InvalidRequest();
    }

    // channel functions
    public getMediasFromChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.channelId)
            throw new InvalidRequest();
    }

    public getMoviesFromChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.channelId)
            throw new InvalidRequest();
    }

    public getSeriesFromChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.channelId)
            throw new InvalidRequest();
    }

    public getMovieSuggestionForChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.channelId)
            throw new InvalidRequest();
    }
        
    public getSeriesSuggestionForChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.channelId)
            throw new InvalidRequest();
    }

    public addGenreToChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.channelId || !req.body.genreId)
            throw new InvalidRequest();
    }

    public deleteGenreFromChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.channelId || !req.body.genreId)
            throw new InvalidRequest();
    }
    
    public addMediaToChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId || !req.body.channelId)
            throw new InvalidRequest();
    }

    public deleteMediaFromChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.mediaId || !req.body.channelId)
            throw new InvalidRequest();
    }

    public createChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.title)
            throw new InvalidRequest();
    }

    public deleteChannelValidation(req: Request): void {
        if(!req.body.username || !req.body.channelId)
            throw new InvalidRequest();
    }

    public addPartyValidation(req: Request): void {
        if(!req.body.username || !req.body.creatorUsername || !req.body.name || !req.body.description)
            throw new InvalidRequest();
    }

    public removePartyValidation(req: Request): void {
        if(!req.body.username || !req.body.partyId)
            throw new InvalidRequest();
    }

    public getPartiesValidation(req: Request): void {
        if(!req.body.username)
            throw new InvalidRequest();
    }

    public inviteParticipantValidation(req: Request): void {
        if(!req.body.username || !req.body.partyId || !req.body.invitedUsername)
            throw new InvalidRequest();
    }

    public acceptPartyInviteValidation(req: Request): void {
        if(!req.body.username || !req.body.partyId || !req.body.invitedUsername)
            throw new InvalidRequest();
    }

    public declinePartyInviteValidation(req: Request): void {
        if(!req.body.username || !req.body.partyId || !req.body.invitedUsername)
            throw new InvalidRequest();
    }

    public getParticipantsValidation(req: Request): void {
        if(!req.body.username || !req.body.partyId)
            throw new InvalidRequest();
    }

    public removeParticipantValidation(req: Request): void {
        if(!req.body.username || !req.body.partyId || !req.body.removedUsername)
            throw new InvalidRequest();
    }
}