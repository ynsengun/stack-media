import {config} from "./Config";
import socket from "./Socket";

function startServer(){
    const PORT: number = <number>config.PORT;
    socket.listen(PORT); // Server is on and socket listens the events
}

startServer();