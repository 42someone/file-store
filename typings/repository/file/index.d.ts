/// <reference types="node" />
import * as Domain from "../../domain";
import * as Storage from "../../storage";
import * as Factories from "../../factory";
export interface FileRepository {
    upload(params: UploadParams): Promise<Domain.File>;
    findMany(options: FindManyOptions): Promise<Domain.File[]>;
    findByID(id: number): Promise<Domain.File>;
    remove(id: number): Promise<Domain.File>;
    replaceExistingFile(params: ReplaceParams): Promise<Domain.File>;
    getFile(id: number): Promise<GetFileResponse>;
}
export declare class FileRepositoryImpl implements FileRepository {
    private readonly mysqlStorage;
    private readonly fileFactory;
    private readonly filesTable;
    constructor(mysqlStorage: Storage.MysqlStorage, fileFactory: Factories.FileFactory);
    upload(params: UploadParams): Promise<Domain.File>;
    findMany(options: FindManyOptions): Promise<Domain.File[]>;
    findByID(id: number): Promise<Domain.File>;
    remove(id: number): Promise<Domain.File>;
    replaceExistingFile(params: ReplaceParams): Promise<Domain.File>;
    getFile(id: number): Promise<GetFileResponse>;
    private toEntity;
    private getExtension;
    private buildQueryOptions;
}
interface UploadParams {
    name: string;
    data: Buffer;
    size: number;
    mimetype: string;
    contentType: string;
}
interface ReplaceParams extends Omit<UploadParams, "contentType"> {
    id: number;
}
interface FindManyOptions {
    skip?: number;
    limit?: number;
}
interface GetFileResponse {
    entity: Domain.File;
    data: Buffer;
}
export {};
