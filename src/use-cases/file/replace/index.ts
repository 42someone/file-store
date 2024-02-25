import {inject, injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
import {Symbols} from "../../../dependencies/dependency-identifiers";

export interface ReplaceFileUseCase extends Infrastructure.UseCase<Params, Promise<Presenters.FileFormatResponse>> {}

@injectable()
export class ReplaceFileUseCaseImpl implements ReplaceFileUseCase {
    constructor(
        @inject(Symbols.FileRepository) private readonly fileRepository: Repositories.FileRepository,
        @inject(Symbols.FilePresenter) private readonly filePresenter: Presenters.FilePresenter
    ) {}

    public async execute(params: Params): Promise<Presenters.FileFormatResponse> {
        const updatedFile = await this.fileRepository.replaceExistingFile(params)
        return this.filePresenter.format(updatedFile)


    }

}

interface Params {
    id: number
    name: string
    data: Buffer
    size: number
    mimetype: string
}