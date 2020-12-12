import * as jwt from 'jsonwebtoken';
import {NoAccess} from "../Model/Error/NoAccess";
import {ErrorResponse} from "../Model/Response/ErrorResponse";
import {NextFunction, Request, Response} from "express";
import {config} from "../Config";

export class TokenService{
    signIn(username: string){
        const secret_key = config.SECRET_KEY;
        return jwt.sign({username : username} , secret_key);
    }

    checkToken(req: Request, res:Response, next:NextFunction){
        console.log("Token 1");
        try {
            const token = req.body.token;
            if (!token)
                throw new NoAccess();
            console.log("Token 2");
            const secret_key = config.SECRET_KEY;
            const verified = jwt.verify(token, secret_key);
            console.log( verified.username);
            console.log( req.body.username);
            if (verified.username !== req.body.username)
                throw new NoAccess();
            console.log( "Token valdiation success...");
            next();
        } catch(err){
            const errorResponse = new ErrorResponse(new NoAccess());
            res.status(errorResponse.status).send(errorResponse);
        }
    }
}