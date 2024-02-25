import * as crypto from "crypto";
import {inject, injectable} from "inversify";
import {Repository} from "typeorm";

import {Symbols} from "../../dependencies/dependency-identifiers";
import * as Domain from "../../domain";
import * as Storage from "../../storage";
import * as Factories from "../../factory";
import {writeFile, unlink, readFile} from "fs/promises";

export interface FileRepository {
    upload(params: UploadParams): Promise<Domain.File>
    findMany(options: FindManyOptions): Promise<Domain.File[]>
    findByID(id: number): Promise<Domain.File>
    remove(id: number): Promise<Domain.File>
    replaceExistingFile(params: ReplaceParams): Promise<Domain.File>
    getFile(id: number): Promise<GetFileResponse>
}

@injectable()
export class FileRepositoryImpl implements FileRepository {
    private readonly filesTable: Repository<Storage.File>
    constructor(
        @inject(Symbols.MySQLStorage) private readonly mysqlStorage: Storage.MysqlStorage,
        @inject(Symbols.FileFactory) private readonly fileFactory: Factories.FileFactory,
    ) {
        this.filesTable = this.mysqlStorage.getDB().getRepository(Storage.File)
    }
    public async upload(params: UploadParams): Promise<Domain.File> {
        const systemName = crypto.randomBytes(16).toString("hex") + params.name
        await writeFile(`upload-files/${systemName}`, params.data)
        const extension = this.getExtension(params.name)
        const storageFile = this.filesTable.create({
            view_name: params.name,
            system_name: systemName,
            extension: extension,
            size: params.size,
            mime_type: params.mimetype,
            upload_time: new Date(),
            update_time: new Date(),
            content_type: params.contentType
        })
        await this.filesTable.save(storageFile)
        return this.toEntity(storageFile)
    }

    public async findMany(options: FindManyOptions): Promise<Domain.File[]> {
        const queryOptions = await this.buildQueryOptions(options)
        console.log("Options: ", queryOptions)
        const foundFiles = await this.filesTable.find(queryOptions)
        if(!foundFiles.length) {
            return []
        }
        return foundFiles.map((file) => this.toEntity(file))
    }

    public async findByID(id: number): Promise<Domain.File> {
        const file = await this.filesTable.findOneBy({id})
        if(!file) {
            throw Object.assign({code: 404}, new Error(`File by id::: ${id} not found`))
        }
        return this.toEntity(file)
    }

    public async remove(id: number): Promise<Domain.File> {
        const deletingFile = await this.findByID(id)
        try {
            await unlink(`upload-files/${deletingFile.getSystemName()}`)
            await this.filesTable.delete({id: deletingFile.getId()})
            return deletingFile
        } catch (e) {
            throw new Error(e.message)
        }
    }

    public async replaceExistingFile(params: ReplaceParams): Promise<Domain.File> {
        const replacingFile = await this.findByID(params.id)
        if (replacingFile.getExtension() !== this.getExtension(params.name)) {
            throw {code: 400, message: "Replacing file type is not compatible with the existing file type"}
        }
        try {
            await writeFile(`upload-files/${replacingFile.getSystemName()}`, params.data)
            const updatedFile = await this.filesTable.update({id: params.id}, {update_time: new Date(), size: params.size})
            return this.toEntity(updatedFile.raw)
        } catch(e) {
            throw new Error(e.message)
        }
    }

    public async getFile(id: number): Promise<GetFileResponse> {
        const foundFile = await this.findByID(id)
        let data: Buffer= Buffer.from("")
        try {
            data = await readFile(`upload-files/${foundFile.getSystemName()}`)
        } catch (e) {
            throw new Error(e.message)
        }
        return {
            entity: foundFile,
            data
        }
    }

    private toEntity(storageFile: Storage.File): Domain.File{
        return this.fileFactory.construct({
            id: storageFile.id,
            viewName: storageFile.view_name,
            systemName: storageFile.system_name,
            extension: storageFile.extension,
            mimeType: storageFile.mime_type,
            size: storageFile.size,
            uploadTime: storageFile.upload_time,
            updateTime: storageFile.update_time,
            contentType: storageFile.content_type
        })

    }

    private getExtension(name: string): string {
        const splitName = name.split(".")
        return splitName[splitName.length - 1]
    }

    private async buildQueryOptions(options: FindManyOptions): Promise<QueryOptions> {
        const result: QueryOptions = {}
        const totalCount = await this.filesTable.count()
        if (options.skip) {
            const skip = (options.skip - 1) * options.limit
            result.skip = skip
        }

        if(options.limit) {
            result.take = options.limit
        }
        return result
    }
}

interface UploadParams {
    name: string
    data: Buffer
    size: number
    mimetype: string
    contentType: string
}

interface ReplaceParams extends Omit<UploadParams, "contentType"> {
    id: number
}

interface FindManyOptions {
    skip?: number
    limit?: number
}


interface GetFileResponse {
    entity: Domain.File,
    data: Buffer
}

interface QueryOptions {
    skip?: number
    take?: number
}