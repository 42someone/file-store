"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceFileUseCaseImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Repositories = tslib_1.__importStar(require("../../../repository"));
const Presenters = tslib_1.__importStar(require("../../../presenters"));
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
let ReplaceFileUseCaseImpl = class ReplaceFileUseCaseImpl {
    constructor(fileRepository, filePresenter) {
        this.fileRepository = fileRepository;
        this.filePresenter = filePresenter;
    }
    execute(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedFile = yield this.fileRepository.replaceExistingFile(params);
            return this.filePresenter.format(updatedFile);
        });
    }
};
exports.ReplaceFileUseCaseImpl = ReplaceFileUseCaseImpl;
exports.ReplaceFileUseCaseImpl = ReplaceFileUseCaseImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.FileRepository)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.FilePresenter)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], ReplaceFileUseCaseImpl);
//# sourceMappingURL=index.js.map