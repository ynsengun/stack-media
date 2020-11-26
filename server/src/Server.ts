import { connected } from "process";
import {config} from "./Config";
import socket from "./Socket";
import {UserBusiness} from "./User/UserBusiness";
import {User} from "./Model/User/User"

function startServer(){
    const PORT: number = <number>config.PORT;
    socket.listen(PORT); // Server is on and socket listens the events
    connectDB();
}

function connectDB() {
}
startServer();
