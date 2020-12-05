import * as express from 'express';
import * as bodyparser from 'body-parser';
import {Routes} from "./Routes";

class App{
    app: express.Application;
    server;
    cors;

    constructor(){
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.cors = require( "cors");
        this.config();
        this.userRoutes();
    }

    private config(){
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended: false}));
        this.app.use( this.cors());
    }

    private userRoutes(){
        const routes = new Routes();
        routes.routes(this.app);
    }

}

export default new App().server;