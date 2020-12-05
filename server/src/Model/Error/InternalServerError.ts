import {ErrorModel} from "./Error";

export class InternalServerError implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1003;
        this.message = "Internal server error occured!";
        this.name = 'Internal Server Error';
        this.status = 400; //?
    }
}