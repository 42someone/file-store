"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFileUseCaseImpl = void 0;
const tslib_1 = require("tslib");
const Repositories = tslib_1.__importStar(require("../../../repository"));
const Presenters = tslib_1.__importStar(require("../../../presenters"));
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
const inversify_1 = require("inversify");
let DeleteFileUseCaseImpl = class DeleteFileUseCaseImpl {
    constructor(fileRepository, filePresenter) {
        this.fileRepository = fileRepository;
        this.filePresenter = filePresenter;
    }
    execute(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const foundFile = yield this.fileRepository.remove(params.id);
            if (!foundFile) {
                throw Object.assign({ code: 404 }, new Error(`File by id::: ${params.id} not found`));
            }
            return this.filePresenter.format(foundFile);
        });
    }
};
exports.DeleteFileUseCaseImpl = DeleteFileUseCaseImpl;
exports.DeleteFileUseCaseImpl = DeleteFileUseCaseImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.FileRepository)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.FilePresenter)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], DeleteFileUseCaseImpl);
//# sourceMappingURL=index.js.map