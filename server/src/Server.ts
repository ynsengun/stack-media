import { connected } from "process";
import {config} from "./Config";
import socket from "./Socket";

function startServer(){
    const PORT: number = <number>config.PORT;
    socket.listen(PORT); // Server is on and socket listens the events
    connectDB();
}

function connectDB() {
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "dijkstra.ug.bcc.bilkent.edu.tr",
        database: "hakan_sivuk",
        user: "hakan.sivuk",
        password: "k3iLQqwg",
        port: 3306
    });

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM User", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
    });
}
startServer();
