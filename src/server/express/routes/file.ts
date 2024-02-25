import {Router} from "express";

import fileupload, {UploadedFile} from "express-fileupload";
import {DependencyContainer} from "../../../dependencies";
import * as UseCases from "../../../use-cases";
import {Symbols} from "../../../dependencies/dependency-identifiers";
import * as Middlewares from "../middleware";
import {checkFileId} from "../validators";
import {createReadStream} from "fs"
const FileRouter = Router()

FileRouter.use(Middlewares.IsAuthenticated)

FileRouter.post("/upload", fileupload({createParentPath: true,}), async (req, res) => {
    if(!req.files) {
        res.status(400).json({message: "Expected file"})
    }
    let file = Object.values(req.files)[0] as UploadedFile
    const UploadFileUseCase = DependencyContainer.get<UseCases.UploadFileUseCase>(Symbols.UploadFileUseCase)
    try {
        const response = await UploadFileUseCase.execute({
            data: file.data,
            name: file.name,
            mimetype: file.mimetype,
            size: file.size,
            contentType: req.header("Content-Type")

        })

        return res.status(201).json(response)
    } catch (e) {
        res.status(500).json({message: e.message, stack: e.stack})
    }

    res.sendStatus(201)
})

FileRouter.get("/list",Middlewares.validatePagination, Middlewares.checkValidation, async (req, res) => {

    const {list_size, page} = req.query as unknown as ListQuery
    try {
        const GetFilesUseCase = DependencyContainer.get<UseCases.GetFilesUseCase>(Symbols.GetFilesUseCase)
        const result = await GetFilesUseCase.execute({
            limit: +list_size,
            skip: +page
        })
        return res.status(200).send(result)
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }

})

FileRouter.get("/:id",
    checkFileId(),
    async (req, res) => {
        const GetOneFileUseCase = DependencyContainer.get<UseCases.GetOneFileUseCase>(Symbols.GetOneFileUseCase)
        try {
            const result = await GetOneFileUseCase.execute({id: +req.params.id})
            return res.json(result)
        } catch (e) {
            if(e.code) {
                return res.status(e.code).json({message: e.message})
            }
            res.json({message: e.message})
        }
        res.sendStatus(200)
    }
)

FileRouter.delete("/delete/:id",checkFileId(), Middlewares.checkValidation, async (req, res) => {
    const id = req.params.id
    const DeleteFileUseCase = DependencyContainer.get<UseCases.DeleteFileUseCase>(Symbols.DeleteFileUseCase)

    try {
        const deletedFile = await DeleteFileUseCase.execute({id: +id})
        return res.status(200).json({deleted_file: deletedFile})
    } catch (e) {
        if(e.code) {
            return res.status(e.code || 400).json({message: e.message})
        }
        return res.json({message: e.message})
    }

})

FileRouter.get("/download/:id", checkFileId(), Middlewares.checkValidation, async (req, res) => {
    const id = req.params.id
    const DownloadFileUseCase = DependencyContainer.get<UseCases.DownloadFileUseCase>(Symbols.DownloadFileUseCase)

    try {
        const downloadResult = await DownloadFileUseCase.execute({id: +id})
        res.setHeader("Content-Description", downloadResult.contentDescription)
        res.setHeader("Content-Disposition", downloadResult.contentDisposition)
        res.setHeader("Content-Transfer-Encoding", "binary")
        res.setHeader("Content-Length", downloadResult.contentLength)
        res.setHeader("Content-Type", downloadResult.contentType)

        res.status(200)

        const filePath = `upload-files/${downloadResult.fileName}`
        createReadStream(filePath).pipe(res)
    } catch (e) {
        if(e.code) {
            return res.status(e.code || 400).json({message: e.message})
        }
        return res.json({message: e.message})
    }
})

FileRouter.post("/update/:id", checkFileId(), Middlewares.checkValidation, fileupload({createParentPath: true,}), async (req, res) => {
    if(!req.files) {
        res.status(400).json({message: "Expected file"})
    }
    let file = Object.values(req.files)[0] as UploadedFile
    const id = req.params.id
    const ReplaceFileUseCase = DependencyContainer.get<UseCases.ReplaceFileUseCase>(Symbols.ReplaceFileUseCase)
    try {
        const deletedFile = await ReplaceFileUseCase.execute({
            id,
            name: file.name,
            data: file.data,
            size: file.size,
            mimetype: file.mimetype
        })
        return res.status(200).json({deleted_file: deletedFile})
    } catch (e) {
        if(e.code) {
            return res.status(e.code || 400).json({message: e.message})
        }
        return res.json({message: e.message})
    }


})

interface ListQuery {
    list_size: number
    page: number
}

export {
    FileRouter
}