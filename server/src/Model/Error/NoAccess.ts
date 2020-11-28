import {ErrorModel} from "./Error";

export class NoAccess implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1001;
        this.message = "Access denied";
        this.name = 'Access Denied';
        this.status = 400; //?
    }
}