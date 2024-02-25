import {inject, injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
import {ValidateTokenUseCase} from "../validate-token";
import {RemoveExpiredTokenUseCase} from "../remove-expired-token";

export interface RefreshTokenUseCase extends Infrastructure.UseCase<RefreshTokenUseCaseParams, Promise<Presenters.RefreshTokenPresenterResponse>>{}
@injectable()
export class RefreshTokenUseCaseImpl implements RefreshTokenUseCase {
    constructor(
        @inject(Symbols.UserRepository) private readonly userRepository: Repositories.UserRepository,
        @inject(Symbols.SessionRepository) private readonly sessionRepository: Repositories.SessionRepository,
        @inject(Symbols.UserPresenter) private readonly userPresenter: Presenters.UserPresenter,
        @inject(Symbols.ValidateTokenUseCase) private readonly ValidateTokenUseCase: ValidateTokenUseCase,
        @inject(Symbols.RemoveExpiredTokenUseCase) private readonly RemoveExpiredTokenUseCase: RemoveExpiredTokenUseCase
    ) {
    }
    public async execute(params: RefreshTokenUseCaseParams): Promise<Presenters.WithTokenResponse> {
        let tokenPayload: Repositories.TokenPayloadData;
        try {
            tokenPayload = await this.ValidateTokenUseCase.execute({token: params.refresh_token})
        } catch (e) {
            if(e.message === "Expired Token") {
                const {uuid} = this.sessionRepository.getValueFromToken<Repositories.TokenPayloadData>(params.refresh_token)
                await this.RemoveExpiredTokenUseCase.execute({session_uuid: uuid})
            }
        }
        const user = await this.userRepository.findById(+tokenPayload.user_id)
        if(!user) {
            throw new Error("Invalid Token. No user found from token")
        }
        const result = await this.sessionRepository.refreshToken(user)
        return this.userPresenter.formatToBearerToken({bearerToken: result})
    }

}

export interface RefreshTokenUseCaseParams {
    refresh_token: string
}