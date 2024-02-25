import {inject, injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import * as Repositories from "../../../repository";

export interface RemoveExpiredTokenUseCase extends Infrastructure.UseCase<Params, Promise<void>>{}

@injectable()
export class RemoveExpiredTokenUseCaseImpl implements RemoveExpiredTokenUseCase {
    constructor(
        @inject(Symbols.SessionRepository) private readonly sessionRepository: Repositories.SessionRepository
    ) {
    }
    public async execute(params: Params): Promise<void> {
        await this.sessionRepository.removeToken(params.session_uuid)
    }
}

interface Params {
    session_uuid: string
}