import {inject, injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import * as Repositories from "../../../repository";

export interface IsTokenActiveUseCase extends Infrastructure.UseCase<Params, Promise<void>> {}

@injectable()
export class IsTokenActiveUseCaseImpl implements IsTokenActiveUseCase {

    constructor(
        @inject(Symbols.SessionRepository) private readonly sessionRepository: Repositories.SessionRepository
    ) {
    }
    public async execute(params: Params): Promise<void> {
        const isActive = await this.sessionRepository.isTokenActive(params.token_uuid)
        if(!isActive) {
            throw new Error("Token Invalid")
        }
    }
}

interface Params {
    token_uuid: string
}