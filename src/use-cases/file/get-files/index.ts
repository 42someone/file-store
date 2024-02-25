import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import {inject, injectable} from "inversify";

export interface GetFilesUseCase extends Infrastructure.UseCase<Params, Response> {}
@injectable()
export class GetFilesUseCaseImpl implements GetFilesUseCase {
    constructor(
        @inject(Symbols.FileRepository) private readonly fileRepository: Repositories.FileRepository,
        @inject(Symbols.FilePresenter) private readonly filePresenter: Presenters.FilePresenter,
    ) {}

    public async execute(params: Params): Response {
       const foundFiles = await this.fileRepository.findMany({limit: params.limit, skip: params.skip})
        return foundFiles.map((file) => this.filePresenter.format(file))
    }
}

type Response = Promise<Presenters.FileFormatResponse[]>

interface Params {
    limit: number
    skip: number
}