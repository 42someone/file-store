import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
export interface DownloadFileUseCase extends Infrastructure.UseCase<Params, Response> {
}
export declare class DownloadFileUseCaseImpl implements DownloadFileUseCase {
    private readonly fileRepository;
    private readonly filePresenter;
    constructor(fileRepository: Repositories.FileRepository, filePresenter: Presenters.FilePresenter);
    execute(params: Params): Promise<Presenters.FileDownloadResponse>;
}
type Response = Promise<Presenters.FileDownloadResponse>;
interface Params {
    id: number;
}
export {};
