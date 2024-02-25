"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFactoryImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Domain = tslib_1.__importStar(require("../../domain"));
let FileFactoryImpl = class FileFactoryImpl {
    construct(params) {
        return new Domain.File(params.id, params.viewName, params.systemName, params.extension, params.mimeType, params.size, params.uploadTime, params.updateTime, params.contentType);
    }
};
exports.FileFactoryImpl = FileFactoryImpl;
exports.FileFactoryImpl = FileFactoryImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileFactoryImpl);
//# sourceMappingURL=index.js.map