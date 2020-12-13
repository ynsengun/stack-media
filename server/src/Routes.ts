import {Controller} from "./Controller";
import {Request, Response} from "express";
import {TokenService} from "./Service/TokenService";

export class Routes{
    
    private controller: Controller;
    private tokenService: TokenService;

    constructor(){
        this.controller = new Controller();
        this.tokenService = new TokenService();
    }

    private userRoutes(app){
        app.route('/api/user/login')
            .post((req: Request, res: Response) => {
                this.controller.login(req, res);
            });
        app.route('/api/user/register')
            .post((req: Request, res: Response) => {
                this.controller.register(req, res)
            });
        
        app.route('/api/user/getParties')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getParties(req, res)
            });
        
        app.route('/api/user/getChannels')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getChannels(req, res)
            });
        
        app.route('/api/user/getFriendActivities')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getFriendActivities(req, res)
            });
        
        app.route('/api/user/rate')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.rateMedia(req, res)
            });

        app.route('/api/user/addComment')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.addComment(req, res)
            });

            app.route('/api/user/deleteComment')
            .delete(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.deleteComment(req, res)
            });

        app.route('/api/user/addGenre')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.addGenre(req, res)
            });

        app.route('/api/user/deleteGenre')
            .delete(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.deleteGenre(req, res)
            });

        app.route('/api/user/changePassword')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.changePassword(req, res)
            });
        
        app.route('/api/user/changeInfo')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.changeInfo(req, res)
            });
        /*
        app.route('/api/user/logout')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.logout(req, res);
            });
        */
       /*

        app.route('/api/user/addFriend')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.addFriend(req, res)
            });
        
        app.route('/api/user/deleteFriend')
            .delete(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.deleteFriend(req, res)
            });*/
    }

    private mediaRoutes(app){
        app.route('/api/media/getMedia')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
            this.controller.getMedia(req, res)
        });

        app.route('/api/media/getMovies')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getMovies(req, res)
            });
        
        app.route('/api/media/getSeries')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getSeries(req, res)
            });

        app.route('/api/media/getMoviesWithPreference')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getMoviesWithGenrePreference(req, res)
            });

        app.route('/api/media/getSeriesWithPreference')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getSeriesWithGenrePreference(req, res)
            });

        app.route('/api/media/getRating')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getRating(req, res)
            });

        
        app.route('/api/media/createMedia')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.createMedia(req, res)
            });

        app.route('/api/media/delete')
            .delete(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.deleteMedia(req, res)
            });

        app.route('/api/media/search')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.search(req, res)
            });

        app.route('/api/media/getWatch')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getWatch(req, res)
            });

        app.route('/api/media/watch')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.watch(req, res)
            });

        app.route('/api/media/getSuggestion')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getSuggestionForMedia(req, res)
            });
        /*

        app.route('/api/media/getComments')
            .get(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getComments(req, res)
            });

        app.route('/api/media/createSerie')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.createSerie(req, res)
            });

        app.route('/api/media/createMovie')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.createMovie(req, res)
            });

        */
    }

    private channelRoutes(app){
        
        app.route('/api/channel/getMovies')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getMoviesFromChannel(req, res)
            });
        
        app.route('/api/channel/getSeries')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getSeriesFromChannel(req, res)
            });
        
        app.route('/api/channel/getMovieSuggestion')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getMovieSuggestionForChannel(req, res)
            });

        app.route('/api/channel/getSeriesSuggestion')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.getSeriesSuggestionForChannel(req, res)
            });

        app.route('/api/channel/addGenre')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.addGenreToChannel(req, res)
            });

        app.route('/api/channel/deleteGenre')
            .delete(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.deleteGenreFromChannel(req, res)
            });

        app.route('/api/channel/addMovie')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.addMediaToChannel(req, res)
            });

        app.route('/api/channel/deleteMovie')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.deleteMediaFromChannel(req, res)
            });

        app.route('/api/channel/create')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.createChannel(req, res)
            });

        app.route('/api/channel/delete')
            .delete(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.controller.deleteChannel(req, res)
            });
    }
    
    public routes(app){
        
        this.userRoutes(app);
        
        this.mediaRoutes(app);
        
        this.channelRoutes(app);

        app.route('/api/test') // For test purposes, should be deleted ***************************************
        .get((req, res) => {
            res.send("Hello");
            console.log("Hello");
        })   
    }

}