import {ErrorModel} from "./Error";

export class InvalidUserInformation implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1000;
        this.message = "Invalid user information";
        this.name = 'Invalid Information';
        this.status = 400; //?
    }
}