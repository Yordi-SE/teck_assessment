import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const getUser = (req: any, res: Response, next: NextFunction) => {

    const token = req.header("auth-token");
    
    if (!token) {
        return res.status(401).json({
            message: "Access denied, token not provided"
        });
    }
    try {
        if (!process.env.SECRET_KEY) {
            return res.status(500).json({ message: "Secret key not defined" });
        }
        jwt.verify(token, process.env.SECRET_KEY, (err:any, decoded:any) => {
            if (err) {
                return res.status(400).json({
                    message: "Invalid token"
                    });
                }
                req.user = {
                    id: decoded.id,
                    role: decoded.role
                }   
                next();
            });
    } catch (err) {
        res.status(400).json({
            message: "Invalid token"
        });
    };
};




export { getUser };