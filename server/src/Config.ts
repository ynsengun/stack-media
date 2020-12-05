import * as dotenv from 'dotenv';

dotenv.config();
export const config = {
    PORT: process.env.PORT || 4000,
    SECRET_KEY: process.env.SECRET_KEY || "secret"
};