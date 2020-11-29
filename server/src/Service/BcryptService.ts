
import * as bcrypt from "bcrypt";
import {WrongUsernameOrPassword} from "../Model/Error//WrongUsernameOrPassword";
import {InternalServerError} from "../Model/Error/InternalServerError";

export class BcryptService {


    public async comparePasswords(sourcePsw:string , targetPsw: string){
        try {
            let match = await bcrypt.compare(sourcePsw, targetPsw);
            if(!match) throw new WrongUsernameOrPassword();
        } catch(error){
            if(error instanceof WrongUsernameOrPassword){
                throw error;
            }
            else{
                throw new InternalServerError();
            }
        }
    }

    public async passwordHash(password:string): Promise<string> {

        try {
            let salt = await bcrypt.genSalt();
            return await bcrypt.hash(password, salt);
        } catch (error) {
            throw new InternalServerError();
        }
    }

}