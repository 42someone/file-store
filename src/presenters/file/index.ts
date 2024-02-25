import {injectable} from "inversify";

import * as Infrastructure from "../../infrastructure";
import * as Domain from "../../domain";
import * as buffer from "buffer";

export interface FilePresenter extends Infrastructure.Presenter<Domain.File, FileFormatResponse> {
    formatForDownload(params: FileDownloadParams): FileDownloadResponse
}

@injectable()
export class FilePresenterImpl implements FilePresenter {
    public format(entity: Domain.File): FileFormatResponse {
        return {
            id: entity.getId(),
            name: entity.getViewName(),
            size: `${entity.getSizeInKB()} KB`,
            extension: entity.getExtension(),
            mimetype: entity.getMimeType(),
            upload_date: entity.getUploadTime().toString()
        }
    }

        public formatForDownload(params: FileDownloadParams): FileDownloadResponse {
        return {
            data: params.data,
            contentType: params.entity.getContentType(),
            contentLength: params.entity.getSize(),
            contentDescription: "File Transfer",
            contentDisposition: `attachment; filename=${encodeURIComponent(params.entity.getViewName())}`,
            contentTransferEncoding: "binary",
            fileName: params.entity.getSystemName()
        }
    }
}

export interface FileFormatResponse {
    name: string
    id: number
    size: string
    extension: string
    mimetype: string
    upload_date: string
}

export interface FileDownloadParams {
    entity: Domain.File
    data: Buffer
}
export interface FileDownloadResponse {
    contentType: string
    contentLength: number
    contentDescription: string
    contentDisposition: string
    contentTransferEncoding: string
    data: Buffer
    fileName: string
}