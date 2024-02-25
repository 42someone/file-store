import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export function checkValidation(req: Request, res: Response, next: NextFunction) {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) return res.status(400).send(validationErrors.array())
    next()
}