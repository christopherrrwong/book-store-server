import dotenv from "dotenv";
import { env } from "./env";

dotenv.config();

export default {
    jwtSecret: env.SECRET,
    jwtSession: {
        session: false,
    },
};
