import {Response, Router} from "express";
import {checkSchema, matchedData, validationResult} from "express-validator";
import {RefreshTokenSchema, SignInParamsValidatorSchema, SigupParamsValidatorSchema} from "../validators";
import {DependencyContainer} from "../../../dependencies";
import * as UseCases from "../../../use-cases";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import {Request} from "express-validator/src/base";

import * as Middleware from "../middleware";
import {TokenPayloadData} from "../../../repository";

const AuthRouter = Router();

AuthRouter.post("/signup", checkSchema(SigupParamsValidatorSchema),Middleware.checkValidation, async (req, res) => {
    const params = matchedData(req, {locations: ['body']}) as unknown as UseCases.SignupParams
    // user creation
    const signupUseCase = DependencyContainer.get<UseCases.SignupUseCase>(Symbols.SignupUseCase)
    const signupResponse = await signupUseCase.execute(params)

    res.status(201).json(signupResponse)
})

AuthRouter.post("/signin", checkSchema(SignInParamsValidatorSchema), Middleware.checkValidation, async (req, res) => {
    const params = matchedData(req, {locations: ['body']}) as unknown as UseCases.SignupParams
    // user login
    const signInUseCase = DependencyContainer.get<UseCases.SignInUseCase>(Symbols.SignInUseCase)
    try {
        const signInResponse = await signInUseCase.execute(params)
        return res.status(201).json(signInResponse)
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})

AuthRouter.post("/signin/new_token", checkSchema(RefreshTokenSchema), Middleware.checkValidation, async (req: Request, res: Response) => {
    const params = matchedData(req, { locations: ['body'] }) as unknown as UseCases.RefreshTokenUseCaseParams

    const RefreshTokenUseCase = DependencyContainer.get<UseCases.RefreshTokenUseCase>(Symbols.RefreshTokenUseCase)
    try {
        const result = await RefreshTokenUseCase.execute(params)
        res.status(201).json(result)
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})

AuthRouter.get("/logout", Middleware.IsAuthenticated, async (req, res) => {
    const LogoutUseCase = DependencyContainer.get<UseCases.LogoutUseCase>(Symbols.LogoutUseCase);
    try {
        const tokenPayload = req["token_payload"] as TokenPayloadData
        await LogoutUseCase.execute({session_uuid: tokenPayload.uuid})
        res.status(200).json({message: "Logout success"})
    } catch (e) {
        res.status(400).json({message: e.message, stack: e.stack})
    }

})

export {
    AuthRouter
}