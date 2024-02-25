import {inject, injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
import {Symbols} from "../../../dependencies/dependency-identifiers";

export interface DownloadFileUseCase extends Infrastructure.UseCase<Params, Response> {}

@injectable()
export class DownloadFileUseCaseImpl implements DownloadFileUseCase {
    constructor(
        @inject(Symbols.FileRepository) private readonly fileRepository: Repositories.FileRepository,
        @inject(Symbols.FilePresenter) private readonly filePresenter: Presenters.FilePresenter
    ) {}

    public async execute(params: Params): Promise<Presenters.FileDownloadResponse> {
        try {
            const result = await this.fileRepository.getFile(params.id)
            return this.filePresenter.formatForDownload(result)
        } catch (e) {
            throw new Error(e.message)
        }

    }

}

type Response = Promise<Presenters.FileDownloadResponse>

interface Params {
    id: number
}