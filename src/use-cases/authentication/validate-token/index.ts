import {inject, injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import * as Repositories from "../../../repository";
import * as Components from "../../../components";
import * as UseCases from "../../index";

export interface ValidateTokenUseCase extends Infrastructure.UseCase<Params, Promise<Repositories.TokenPayloadData>> {}

@injectable()
export class ValidateTokenUseCaseImpl implements ValidateTokenUseCase {
    constructor(
        @inject(Symbols.Jwt) private readonly jwtComponent: Components.Jwt,
        @inject(Symbols.SessionRepository) private readonly SessionRepository: Repositories.SessionRepository,
        @inject(Symbols.IsTokenActiveUseCase) private readonly IsTokenActiveUseCase: UseCases.IsTokenActiveUseCase,
        @inject(Symbols.RemoveExpiredTokenUseCase) private readonly RemoveExpiredTokenUseCase: UseCases.RemoveExpiredTokenUseCase,

    ) {
    }
    public async execute(params: Params): Promise<Repositories.TokenPayloadData> {
        let tokenPayload: Repositories.TokenPayload;
        // verify token
        try {
            tokenPayload = this.jwtComponent.verify(params.token) as unknown as Repositories.TokenPayload
        } catch (e) {
            // if not valid
            if(e.message === "jwt expired") {
                // -- if expired
                // --- remove token
                // --- throw error token expired
                // await this.RemoveExpiredTokenUseCase.execute({expired_token: params.token})
                throw new Error("Expired Token")
            }
            // -- if other
            // -- throw error token invalid
            throw new Error("Invalid token")
        }
        // check if token is active in active-sessions
        try {
            await this.IsTokenActiveUseCase.execute({token_uuid: tokenPayload.payload.uuid})
        } catch (e) {
            // if not throw error
            throw new Error("Session expired")
        }
        // return token payload data
        return tokenPayload.payload
    }
}

interface Params {
    token: string
}