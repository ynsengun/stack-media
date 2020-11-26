import {Controller} from "./Controller";
import {Request, Response} from "express";
//import {TokenService} from "./TokenService";

export class Routes{
    
    private controller: Controller;
    //private tokenService: TokenService;

    constructor(){
        this.controller = new Controller();
        //this.tokenService = new TokenService();
    }

    public routes(app){
        app.route('/api/user/login')
            .post((req: Request, res: Response) => {
                this.controller.login(req, res);
            });
        app.route('/api/user/register')
            .post((req: Request, res: Response) => {
                this.controller.register(req, res)
            });
        /*
        app.route('/api/user/changePassword')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.userController.changePassword(req, res);
            });

        app.route('/api/user/logout')
            .post(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.userController.logout(req, res);
            });*/

        app.route('/api/get') // For test purposes, should be deleted ***************************************
        .get((req, res) => {
            res.send("Hello");
            console.log("Hello");
        })   
    }

}