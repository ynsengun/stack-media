import { ResponseModel } from "./ResponseModel";
import { ResultModel } from "./Result";

export class SuccessResponse implements ResponseModel {

    result: ResultModel; 
    data: null;
    status: number;

    constructor(data) {
        this.result = {
            code : 0,
            message : "Success"
        };
        this.data = data;
        this.status = 200;
    }
     
}