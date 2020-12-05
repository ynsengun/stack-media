import {ErrorModel} from "./Error";

export class InvalidRequest implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1000;
        this.message = "Invalid request";
        this.name = 'Invalid Requet';
        this.status = 400; //?
    }
}