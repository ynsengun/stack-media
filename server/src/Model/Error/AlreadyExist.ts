import {ErrorModel} from "./Error";

export class AlreadyExist implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1005;
        this.message = "Id already exists!";
        this.name = 'Already Exist';
        this.status = 400; //?
    }
}