"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveExpiredTokenImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
const Repositories = tslib_1.__importStar(require("../../../repository"));
let RemoveExpiredTokenImpl = class RemoveExpiredTokenImpl {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    execute(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.sessionRepository.removeToken(params.expired_token);
        });
    }
};
exports.RemoveExpiredTokenImpl = RemoveExpiredTokenImpl;
exports.RemoveExpiredTokenImpl = RemoveExpiredTokenImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.SessionRepository)),
    tslib_1.__metadata("design:paramtypes", [Object])
], RemoveExpiredTokenImpl);
//# sourceMappingURL=index.js.map