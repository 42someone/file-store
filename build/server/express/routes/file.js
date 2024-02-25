"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const express_fileupload_1 = tslib_1.__importDefault(require("express-fileupload"));
const dependencies_1 = require("../../../dependencies");
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
const Middlewares = tslib_1.__importStar(require("../middleware"));
const validators_1 = require("../validators");
const Middleware = tslib_1.__importStar(require("../middleware"));
const fs_1 = require("fs");
const FileRouter = (0, express_1.Router)();
exports.FileRouter = FileRouter;
FileRouter.post("/upload", (0, express_fileupload_1.default)({ createParentPath: true, }), (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        res.status(400).json({ message: "Expected file" });
    }
    let file = Object.values(req.files)[0];
    const UploadFileUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.UploadFileUseCase);
    try {
        const response = yield UploadFileUseCase.execute({
            data: file.data,
            name: file.name,
            mimetype: file.mimetype,
            size: file.size,
            contentType: req.header("Content-Type")
        });
        return res.status(201).json(response);
    }
    catch (e) {
        res.status(500).json({ message: e.message, stack: e.stack });
    }
    res.sendStatus(201);
}));
FileRouter.get("/list", Middlewares.validatePagination, Middlewares.checkValidation, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { list_size, page } = req.query;
    try {
        const GetFilesUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.GetFilesUseCase);
        const result = yield GetFilesUseCase.execute({
            limit: +list_size,
            skip: +page
        });
        return res.status(200).send(result);
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
FileRouter.get("/:id", (0, validators_1.checkFileId)(), (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const GetOneFileUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.GetOneFileUseCase);
    try {
        const result = yield GetOneFileUseCase.execute({ id: +req.params.id });
        return res.json(result);
    }
    catch (e) {
        if (e.code) {
            return res.status(e.code).json({ message: e.message });
        }
        res.json({ message: e.message });
    }
    res.sendStatus(200);
}));
FileRouter.delete("/delete/:id", (0, validators_1.checkFileId)(), Middleware.checkValidation, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const DeleteFileUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.DeleteFileUseCase);
    try {
        const deletedFile = yield DeleteFileUseCase.execute({ id: +id });
        return res.status(200).json({ deleted_file: deletedFile });
    }
    catch (e) {
        if (e.code) {
            return res.status(e.code || 400).json({ message: e.message });
        }
        return res.json({ message: e.message });
    }
}));
FileRouter.get("/download/:id", (0, validators_1.checkFileId)(), Middleware.checkValidation, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const DownloadFileUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.DownloadFileUseCase);
    try {
        const downloadResult = yield DownloadFileUseCase.execute({ id: +id });
        res.setHeader("Content-Description", downloadResult.contentDescription);
        res.setHeader("Content-Disposition", downloadResult.contentDisposition);
        res.setHeader("Content-Transfer-Encoding", "binary");
        res.setHeader("Content-Length", downloadResult.contentLength);
        res.setHeader("Content-Type", downloadResult.contentType);
        res.status(200);
        const filePath = `upload-files/${downloadResult.fileName}`;
        (0, fs_1.createReadStream)(filePath).pipe(res);
    }
    catch (e) {
        if (e.code) {
            return res.status(e.code || 400).json({ message: e.message });
        }
        return res.json({ message: e.message });
    }
}));
FileRouter.post("/update/:id", (0, validators_1.checkFileId)(), Middleware.checkValidation, (0, express_fileupload_1.default)({ createParentPath: true, }), (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        res.status(400).json({ message: "Expected file" });
    }
    let file = Object.values(req.files)[0];
    const id = req.params.id;
    const ReplaceFileUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.ReplaceFileUseCase);
    try {
        const deletedFile = yield ReplaceFileUseCase.execute({
            id,
            name: file.name,
            data: file.data,
            size: file.size,
            mimetype: file.mimetype
        });
        return res.status(200).json({ deleted_file: deletedFile });
    }
    catch (e) {
        if (e.code) {
            return res.status(e.code || 400).json({ message: e.message });
        }
        return res.json({ message: e.message });
    }
}));
//# sourceMappingURL=file.js.map