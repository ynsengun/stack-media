import {ErrorModel} from "./Error";

export class UsernameExists implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1002;
        this.message = "This username is already in use!";
        this.name = 'Username Exists';
        this.status = 400; //?
    }
}