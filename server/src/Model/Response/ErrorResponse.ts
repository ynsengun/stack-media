import {ResponseModel} from "./ResponseModel";
import {ResultModel} from "./Result";
import {ErrorModel} from "../Error/Error";

export class ErrorResponse implements ResponseModel{

    result: ResultModel;
    data: null;
    status: number;

    constructor(error: ErrorModel) {
        this.result = {
            code: error.code || 9999,
            message: error.message
        };
        this.data = null;
        this.status = error.status || 400;
    }

}