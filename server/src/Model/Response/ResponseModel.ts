import { ResultModel } from "./Result";

export interface ResponseModel {
    result: ResultModel
    data?: null
    status: number
}