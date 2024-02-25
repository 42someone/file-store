"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
class File {
    constructor(id, viewName, systemName, extension, mimeType, size, uploadDateTime, updateTime, contentType) {
        this.id = id;
        this.viewName = viewName;
        this.systemName = systemName;
        this.extension = extension;
        this.mimeType = mimeType;
        this.size = size;
        this.uploadDateTime = uploadDateTime;
        this.updateTime = updateTime;
        this.contentType = contentType;
    }
    getId() {
        return this.id;
    }
    getViewName() {
        return this.viewName;
    }
    getSystemName() {
        return this.systemName;
    }
    getExtension() {
        return this.extension;
    }
    getMimeType() {
        return this.mimeType;
    }
    getSize() {
        return this.size;
    }
    getSizeInKB() {
        return this.size / 1000;
    }
    getUploadTime() {
        return this.uploadDateTime;
    }
    getUpdateTime() {
        return this.updateTime;
    }
    getContentType() {
        return this.contentType;
    }
}
exports.File = File;
//# sourceMappingURL=index.js.map