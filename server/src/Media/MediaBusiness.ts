import {MediaDBService} from "./MediaDBService";
//import {SuccessResponse} from "../SuccessResponse";
//import {ErrorResponse} from "../ErrorResponse";
//import {ResponseModel} from "../Models/Response/ResponseModel";
//import { User } from "../Models/User/User";

export class MediaBusiness {

    private mediaDBService: MediaDBService;

    constructor(){
        this.mediaDBService = new MediaDBService();
    }
}