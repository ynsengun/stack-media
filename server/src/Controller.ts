import {Request, Response} from "express";
import {UserBusiness} from "./User/UserBusiness";
import {MediaBusiness} from "./Media/MediaBusiness";
import {ChannelBusiness} from "./Channel/ChannelBusiness";
import {Validation} from "./Service/Validation";
import {ErrorResponse} from "./Model/Response/ErrorResponse";
import userMapping from "./Service/UserMapping";

export class Controller{

    private userBusiness: UserBusiness;
    private validation: Validation;

    constructor() {
        this.userBusiness = new UserBusiness();
        this.validation = new Validation();
    }

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
            //console.log(request.body);
            this.validation.registerValidation(request);
            let result = await this.userBusiness.register(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
    /*
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

    public async logout(request: Request, response: Response): Promise<void> {
        try{
            this.validation.logout(request);
            let result = await this.userBusiness.logout(userMapping.map(request.body));
            response.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            response.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }*/
}