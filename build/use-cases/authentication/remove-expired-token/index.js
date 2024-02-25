"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveExpiredTokenUseCaseImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
const Repositories = tslib_1.__importStar(require("../../../repository"));
let RemoveExpiredTokenUseCaseImpl = class RemoveExpiredTokenUseCaseImpl {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    execute(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.sessionRepository.removeToken(params.session_uuid);
        });
    }
};
exports.RemoveExpiredTokenUseCaseImpl = RemoveExpiredTokenUseCaseImpl;
exports.RemoveExpiredTokenUseCaseImpl = RemoveExpiredTokenUseCaseImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.SessionRepository)),
    tslib_1.__metadata("design:paramtypes", [Object])
], RemoveExpiredTokenUseCaseImpl);
//# sourceMappingURL=index.js.map