import {ErrorModel} from "./Error";

export class WrongUsernameOrPassword implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1004;
        this.message = "Please check your username and password!";
        this.name = 'Wrong Username Or Password';
        this.status = 400; //?
    }
}