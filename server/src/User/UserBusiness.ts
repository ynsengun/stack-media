import {UserDBService} from "./UserDBService";
import {SuccessResponse} from "../Model/Response/SuccessResponse";
import {ErrorResponse} from "../Model/Response/ErrorResponse";
import {ResponseModel} from "../Model/Response/ResponseModel";
import { User } from "../Model/User/User";

export class UserBusiness {

    private userDBService: UserDBService;

    constructor(){
        this.userDBService = new UserDBService();
    }
    
    public async login(user: User): Promise<ResponseModel> {
        try {
            const email = user.email;
            const password = user.password;
            let result = await this.userDBService.login(email, password);
            return new SuccessResponse(result);
        } catch(error) {
            return new ErrorResponse(error);
        }
    }
    
    public async register(user: User): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.register(user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }
}