import {inject, injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
import {Symbols} from "../../../dependencies/dependency-identifiers";

export interface UploadFileUseCase extends Infrastructure.UseCase<Params, Promise<Presenters.FileFormatResponse>> {}

@injectable()
export class UploadFileUseCaseImpl implements UploadFileUseCase {
    constructor(
        @inject(Symbols.FileRepository) private readonly fileRepository: Repositories.FileRepository,
        @inject(Symbols.FilePresenter) private readonly filePresenter: Presenters.FilePresenter
    ) {}

    public async execute(params: Params): Promise<Presenters.FileFormatResponse> {
        try {
            const result = await this.fileRepository.upload(params)
            return this.filePresenter.format(result)
        } catch (e) {
            throw new Error(e.message)
        }

    }

}

interface Params {
    name: string
    data: Buffer
    size: number
    mimetype: string
    contentType: string
}