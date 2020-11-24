import {ChannelDBService} from "./ChannelDBService";
//import {SuccessResponse} from "../SuccessResponse";
//import {ErrorResponse} from "../ErrorResponse";
//import {ResponseModel} from "../Models/Response/ResponseModel";
//import { User } from "../Models/User/User";

export class ChannelBusiness {

    private channelDBService: ChannelDBService;

    constructor(){
        this.channelDBService = new ChannelDBService();
    }
}