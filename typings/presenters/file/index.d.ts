/// <reference types="node" />
import * as Infrastructure from "../../infrastructure";
import * as Domain from "../../domain";
export interface FilePresenter extends Infrastructure.Presenter<Domain.File, FileFormatResponse> {
    formatForDownload(params: FileDownloadParams): FileDownloadResponse;
}
export declare class FilePresenterImpl implements FilePresenter {
    format(entity: Domain.File): FileFormatResponse;
    formatForDownload(params: FileDownloadParams): FileDownloadResponse;
}
export interface FileFormatResponse {
    name: string;
    id: number;
    size: string;
    extension: string;
    mimetype: string;
    upload_date: string;
}
export interface FileDownloadParams {
    entity: Domain.File;
    data: Buffer;
}
export interface FileDownloadResponse {
    contentType: string;
    contentLength: number;
    contentDescription: string;
    contentDisposition: string;
    contentTransferEncoding: string;
    data: Buffer;
    fileName: string;
}
