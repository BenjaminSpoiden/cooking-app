import { Request, Response } from "express";
import session, { Session } from "express-session";

declare global {
    namespace Express {
        interface Request {
            session: Session & Partial<session.SessionData> 
        }
    }
}

export type MyContext = {
    req: Request 
    res: Response
}
