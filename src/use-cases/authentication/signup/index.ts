import {inject, injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import {SessionRepository} from "../../../repository";

export interface SignupUseCase extends Infrastructure.UseCase<SignupParams, Promise<Presenters.WithTokenResponse>> {}

@injectable()
export class SignupUseCaseImpl implements SignupUseCase {

    constructor (
        @inject(Symbols.UserRepository) private readonly userRepository: Repositories.UserRepository,
        @inject(Symbols.SessionRepository) private readonly sessionRepository: Repositories.SessionRepository,
        @inject(Symbols.UserPresenter) private readonly userPresenter: Presenters.UserPresenter
    ) {
    }
    async execute(params: SignupParams): Promise<any> {
        const user = await this.userRepository.create(params)
        const tokens = await this.sessionRepository.createTokens(user)
        return this.userPresenter.formatWithToken(tokens)
    }
}

export interface SignupParams {
    login: string
    password: string
}