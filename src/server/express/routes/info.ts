import {Router} from "express";

import * as Middlewares from "../middleware";
import {DependencyContainer} from "../../../dependencies";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import * as UseCases from "../../../use-cases";
import {TokenPayloadData} from "../../../repository";


const InfoRouter = Router()

InfoRouter.get('/', Middlewares.IsAuthenticated, async (req, res) => {
    const getInfoUseCase = DependencyContainer.get<UseCases.GetInfoUseCase>(Symbols.GetInfoUseCase)

    try {
        const token_payload = req["token_payload"] as TokenPayloadData
        const info = await getInfoUseCase.execute({id: +token_payload.user_id})
        res.send(info)
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})

export  {
    InfoRouter
}