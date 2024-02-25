/// <reference types="node" />
import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
export interface UploadFileUseCase extends Infrastructure.UseCase<Params, Promise<Presenters.FileFormatResponse>> {
}
export declare class UploadFileUseCaseImpl implements UploadFileUseCase {
    private readonly fileRepository;
    private readonly filePresenter;
    constructor(fileRepository: Repositories.FileRepository, filePresenter: Presenters.FilePresenter);
    execute(params: Params): Promise<Presenters.FileFormatResponse>;
}
interface Params {
    name: string;
    data: Buffer;
    size: number;
    mimetype: string;
    contentType: string;
}
export {};
