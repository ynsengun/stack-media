import {PartyEventController} from "./PartyEventController";
import { TokenService } from "../Service/TokenService";
import { ErrorResponse } from "../Model/Response/ErrorResponse";
import { NoAccess } from "../Model/Error/NoAccess";

export class PartyEventListener{

    private eventController: PartyEventController;
    private tokenService: TokenService;

    constructor(){
        this.eventController = new PartyEventController();
        this.tokenService = new TokenService();
    }

    public listenEvents(socket, client): void {
        client.on('participate', data => {
            console.log("new participation");
            try{
                this.tokenService.checkTokenForParty(data);
                //this.eventController.saveUserId(client, data);
            }
            catch(error){
                client.emit(new ErrorResponse(error));
            }
        });
    }
}