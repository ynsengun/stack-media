import {User} from "../Model/User/User";

class UserMapping{
    public map(userModel): User {
        if(!userModel) return null;
        return {
            password: userModel.password || null,
            username: userModel.username || null,
            userType: userModel.userType || null,
            email: userModel.email || null,
            token: userModel.token || null
        };
    }
}

export default new UserMapping();