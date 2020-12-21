import server from "./App";
import {PartyEventListener} from "./Party/PartyEventListener";

class Socket{
    socket = null;
    partyEventListener: PartyEventListener;

    constructor(){
        this.socket = require('socket.io')(server,  {
          cors: {
            origin: '*',
          }
        });
        this.partyEventListener = new PartyEventListener();
        this.partyEventListener.setSocket(this.socket);
    }

    public listen(PORT: number): void {
        this.socket.on('connection', client => {
            console.log("connected");
            this.partyEventListener.listenEvents(client);
        })

        server.listen(PORT, () => {
            console.log("Server is ready on " + PORT);
        })
    }
}

export default new Socket();