import {inject, injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import * as Repositories from "../../../repository";
import {ValidateTokenUseCase} from "../validate-token";

export interface LogoutUseCase extends Infrastructure.UseCase<Params, Promise<void>> {}

@injectable()
export class LogoutUseCaseImpl implements LogoutUseCase {
    constructor(
        @inject(Symbols.SessionRepository) private readonly sessionRepository: Repositories.SessionRepository,
    ) {
    }
    public async execute(params: Params): Promise<void> {
        try {
            await this.sessionRepository.removeToken(params.session_uuid)
        } catch (e) {
            throw new Error(`Internal server error \n ${e.message}`)
        }
    }
}

interface Params {
    session_uuid: string
}