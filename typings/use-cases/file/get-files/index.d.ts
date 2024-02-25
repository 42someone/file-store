import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
export interface GetFilesUseCase extends Infrastructure.UseCase<Params, Response> {
}
export declare class GetFilesUseCaseImpl implements GetFilesUseCase {
    private readonly fileRepository;
    private readonly filePresenter;
    constructor(fileRepository: Repositories.FileRepository, filePresenter: Presenters.FilePresenter);
    execute(params: Params): Response;
}
type Response = Promise<Presenters.FileFormatResponse[]>;
interface Params {
    limit: number;
    skip: number;
}
export {};
