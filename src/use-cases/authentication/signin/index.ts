import {inject, injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import {SessionRepository} from "../../../repository";
export interface SignInUseCase extends Infrastructure.UseCase<Params, Promise<Presenters.WithTokenResponse>> {}

@injectable()
export class SignInUseCaseImpl implements SignInUseCase {
    constructor(
        @inject(Symbols.UserRepository) private readonly userRepository: Repositories.UserRepository,
        @inject(Symbols.SessionRepository) private readonly sessionRepository: Repositories.SessionRepository,
        @inject(Symbols.UserPresenter) private readonly userPresenter: Presenters.UserPresenter,
    ) {
    }
    public async execute(params: Params): Promise<Presenters.WithTokenResponse> {
        const user = await this.userRepository.findAndCompareUserCreds(params)
        if(!user) {
            throw new Error("Login or password is incorrect")
        }

        const result = await this.sessionRepository.createTokens(user)
        return this.userPresenter.formatWithToken(result)
    }
}

interface Params {
    login: string
    password: string
}