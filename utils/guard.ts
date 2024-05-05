import { Request, Response, NextFunction } from "express";
import jwtSimple from "jwt-simple";
import { Bearer } from "permit";
import { UserType } from "./model";
import jwt from "./jwt";

const permit = new Bearer({
    query: "token",
});

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {
        // get the jwt in request
        // check jwt validity in the request


        const token = permit.check(req);

        if (!token) {
            return res.status(401).json({ msg: "Permission Denied" });
        }

        const decoded: Omit<UserType, "password"> = jwtSimple.decode(
            token,
            jwt.jwtSecret
        );

        req.body.user_id = decoded.id;


        return next();
    } catch (error) {
        return res.status(401).json({ msg: "Permission Denied" });
    }
}
