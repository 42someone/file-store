import * as Domain from "../../domain";
import * as Infrastructure from "../../infrastructure";
export interface FileFactory extends Infrastructure.Factory<Params, Domain.File> {
}
export declare class FileFactoryImpl implements FileFactory {
    construct(params: Params): Domain.File;
}
interface Params {
    id: number;
    viewName: string;
    systemName: string;
    mimeType: string;
    extension: string;
    size: number;
    uploadTime: Date;
    updateTime: Date;
    contentType: string;
}
export {};
