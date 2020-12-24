import eventController from "./PartyEventController";
import { TokenService } from "../Service/TokenService";
import { ErrorResponse } from "../Model/Response/ErrorResponse";
import { NoAccess } from "../Model/Error/NoAccess";

export class PartyEventListener{

    private tokenService: TokenService;

    constructor(){
        this.tokenService = new TokenService();
    }

    public setSocket(socket){
        eventController.setSocket(socket);
    }

    public listenEvents(client): void {
      console.log("hadii ", client.id);
      client.emit("hello-world", "2");
        client.on('join', data => {
            console.log("new join");
            try{
                console.log("join event begins");
                this.tokenService.checkTokenForParty(data);
                console.log("join event token checked");
                eventController.join(client, data);
            }
            catch(error){
                console.log("There is an " + error.name + "error!\n");
                client.emit(new ErrorResponse(error));
            }
        });

        client.on('disconnect', data => {
            console.log(client.id + " disconnected");
            try{
                console.log("disconnection event begins");
                eventController.leave(client);
            }
            catch(error){
                console.log("There is an " + error.name + "error!\n");
                client.emit(new ErrorResponse(error));
            }
        });

        client.on('set-media', data => {
            console.log("set media event");
            try{
                this.tokenService.checkTokenForParty(data);
                console.log("set media event token checked");
                eventController.setMedia(client, data);
            }
            catch(error){
                console.log("There is an " + error.name + "error!\n");
                client.emit(new ErrorResponse(error));
            }
        });

        client.on('send-message', data => {
            console.log("send message event");
            try{
                this.tokenService.checkTokenForParty(data);
                console.log("send message event token checked");
                eventController.sendMessage(client, data);
            }
            catch(error){
                console.log("There is an " + error.name + "error!\n");
                client.emit(new ErrorResponse(error));
            }
        });

        client.on('watch', data => {
            console.log("watch event");
            try{
                this.tokenService.checkTokenForParty(data);
                console.log("watch event token checked");
                eventController.watch(client, data);
            }
            catch(error){
                console.log("There is an " + error.name + "error!\n");
                client.emit(new ErrorResponse(error));
            }
        });

        client.on('take-out', data => {
            console.log("take out event");
            try{
                this.tokenService.checkTokenForParty(data);
                console.log("take out event token checked");
                eventController.takeOut(client, data);
            }
            catch(error){
                console.log("There is an " + error.name + "error!\n");
                client.emit(new ErrorResponse(error));
            }
        });
    }
}