"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepositoryImpl = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
const inversify_1 = require("inversify");
const dependency_identifiers_1 = require("../../dependencies/dependency-identifiers");
const Storage = tslib_1.__importStar(require("../../storage"));
const Factories = tslib_1.__importStar(require("../../factory"));
const promises_1 = require("fs/promises");
let FileRepositoryImpl = class FileRepositoryImpl {
    constructor(mysqlStorage, fileFactory) {
        this.mysqlStorage = mysqlStorage;
        this.fileFactory = fileFactory;
        this.filesTable = this.mysqlStorage.getDB().getRepository(Storage.File);
    }
    upload(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const systemName = crypto.randomBytes(16).toString("hex") + params.name;
            yield (0, promises_1.writeFile)(`upload-files/${systemName}`, params.data);
            const extension = this.getExtension(params.name);
            const storageFile = this.filesTable.create({
                view_name: params.name,
                system_name: systemName,
                extension: extension,
                size: params.size,
                mime_type: params.mimetype,
                upload_time: new Date(),
                update_time: new Date(),
                content_type: params.contentType
            });
            yield this.filesTable.save(storageFile);
            return this.toEntity(storageFile);
        });
    }
    findMany(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryOptions = yield this.buildQueryOptions(options);
            console.log("Options: ", queryOptions);
            const foundFiles = yield this.filesTable.find(queryOptions);
            if (!foundFiles.length) {
                return [];
            }
            return foundFiles.map((file) => this.toEntity(file));
        });
    }
    findByID(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const file = yield this.filesTable.findOneBy({ id });
            if (!file) {
                throw Object.assign({ code: 404 }, new Error(`File by id::: ${id} not found`));
            }
            return this.toEntity(file);
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletingFile = yield this.findByID(id);
            try {
                yield (0, promises_1.unlink)(`upload-files/${deletingFile.getSystemName()}`);
                yield this.filesTable.delete({ id: deletingFile.getId() });
                return deletingFile;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    replaceExistingFile(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const replacingFile = yield this.findByID(params.id);
            if (replacingFile.getExtension() !== this.getExtension(params.name)) {
                throw { code: 400, message: "Replacing file type is not compatible with the existing file type" };
            }
            try {
                yield (0, promises_1.writeFile)(`upload-files/${replacingFile.getSystemName()}`, params.data);
                const updatedFile = yield this.filesTable.update({ id: params.id }, { update_time: new Date(), size: params.size });
                return this.toEntity(updatedFile.raw);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    getFile(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const foundFile = yield this.findByID(id);
            let data = Buffer.from("");
            try {
                data = yield (0, promises_1.readFile)(`upload-files/${foundFile.getSystemName()}`);
            }
            catch (e) {
                throw new Error(e.message);
            }
            return {
                entity: foundFile,
                data
            };
        });
    }
    toEntity(storageFile) {
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
        });
    }
    getExtension(name) {
        const splitName = name.split(".");
        return splitName[splitName.length - 1];
    }
    buildQueryOptions(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = {};
            const totalCount = yield this.filesTable.count();
            if (options.skip) {
                const skip = (options.skip - 1) * options.limit;
                result.skip = skip;
            }
            if (options.limit) {
                result.take = options.limit;
            }
            return result;
        });
    }
};
exports.FileRepositoryImpl = FileRepositoryImpl;
exports.FileRepositoryImpl = FileRepositoryImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.MySQLStorage)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.FileFactory)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], FileRepositoryImpl);
//# sourceMappingURL=index.js.map