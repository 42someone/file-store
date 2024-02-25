import {injectable} from "inversify";

import * as Domain from "../../domain";
import * as Infrastructure from "../../infrastructure";

export interface FileFactory extends Infrastructure.Factory<Params, Domain.File> {}

@injectable()
export class FileFactoryImpl implements FileFactory {
    public construct(params: Params): Domain.File {
        return new Domain.File(
            params.id,
            params.viewName,
            params.systemName,
            params.extension,
            params.mimeType,
            params.size,
            params.uploadTime,
            params.updateTime,
            params.contentType
        )
    }


}

interface Params {
    id: number
    viewName: string
    systemName: string
    mimeType: string
    extension: string
    size: number
    uploadTime: Date
    updateTime: Date
    contentType: string
}