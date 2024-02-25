import { NextFunction, Request, Response} from "express";

import {DependencyContainer} from "../../../dependencies";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import * as UseCases from "../../../use-cases";

export async function IsAuthenticated(req: Request, res: Response, next: NextFunction) {
    const ValidateTokenUseCase =  DependencyContainer.get<UseCases.ValidateTokenUseCase>(Symbols.ValidateTokenUseCase)

    const { authorization} = req.headers
    const bearerToken = authorization?.split(" ")[1]
    if(!bearerToken) {
        return res.status(401).json({message: "User is unauthorized"})
    }

    try {
        req["token_payload"] = await ValidateTokenUseCase.execute({token: bearerToken})
        next()
    } catch (e) {
        if(e.message === "Invalid token") {
            res.status(400)
        } else {
            res.status(401)
        }
        return res.json({message: e.message})
    }
}