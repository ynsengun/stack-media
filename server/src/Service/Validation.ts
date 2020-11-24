import {InvalidUserInformation} from "../Model/Error/InvalidUserInformation";
import {Request} from "express";

export class Validation{

    public loginValidation(req: Request): void {
        if(!req.body.email || !req.body.password)
            throw new InvalidUserInformation();
    }
    
    public registerValidation(req: Request): void {
        if(!req.body.email || !req.body.password || !req.body.userType || !req.body.username)
            throw new InvalidUserInformation();
    }
}