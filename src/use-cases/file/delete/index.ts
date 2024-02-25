import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import {inject, injectable} from "inversify";

export interface DeleteFileUseCase extends Infrastructure.UseCase<Params, Response> {}
@injectable()
export class DeleteFileUseCaseImpl implements DeleteFileUseCase {
    constructor(
        @inject(Symbols.FileRepository) private readonly fileRepository: Repositories.FileRepository,
        @inject(Symbols.FilePresenter) private readonly filePresenter: Presenters.FilePresenter,
    ) {}

    public async execute(params: Params): Response {
        const foundFile = await this.fileRepository.remove(params.id)
        if(!foundFile) {
            throw Object.assign({ code: 404 }, new Error(`File by id::: ${params.id} not found`))
        }

        return this.filePresenter.format(foundFile)
    }
}

type Response = Promise<Presenters.FileFormatResponse>

interface Params {
    id: number
}