import { UserDBService } from "../User/UserDBService";

export class PartyEventController{

    private userDBService: UserDBService;

    constructor(){
        this.userDBService = new UserDBService();
    }

    
}