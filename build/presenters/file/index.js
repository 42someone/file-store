"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilePresenterImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
let FilePresenterImpl = class FilePresenterImpl {
    format(entity) {
        return {
            id: entity.getId(),
            name: entity.getViewName(),
            size: `${entity.getSizeInKB()} KB`,
            extension: entity.getExtension(),
            mimetype: entity.getMimeType(),
            upload_date: entity.getUploadTime().toString()
        };
    }
    formatForDownload(params) {
        return {
            data: params.data,
            contentType: params.entity.getContentType(),
            contentLength: params.entity.getSize(),
            contentDescription: "File Transfer",
            contentDisposition: `attachment; filename=${encodeURIComponent(params.entity.getViewName())}`,
            contentTransferEncoding: "binary",
            fileName: params.entity.getSystemName()
        };
    }
};
exports.FilePresenterImpl = FilePresenterImpl;
exports.FilePresenterImpl = FilePresenterImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FilePresenterImpl);
//# sourceMappingURL=index.js.map