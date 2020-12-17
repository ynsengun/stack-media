import server from "./App";
import {PartyEventListener} from "./Party/PartyEventListener";

class Socket{
    socket = null;
    partyEventListener: PartyEventListener;

    constructor(){
        this.socket = require('socket.io')(server);
        this.partyEventListener = new PartyEventListener();
    }

    public listen(PORT: number): void {
        this.socket.on('connection', client => {
            console.log("connected");
            this.partyEventListener.listenEvents(this.socket, client);
        })

        server.listen(PORT, () => {
            console.log("Server is ready on " + PORT);
        })
    }
}

export default new Socket();