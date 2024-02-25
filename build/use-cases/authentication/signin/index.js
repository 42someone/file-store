"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInUseCaseImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Repositories = tslib_1.__importStar(require("../../../repository"));
const Presenters = tslib_1.__importStar(require("../../../presenters"));
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
let SignInUseCaseImpl = class SignInUseCaseImpl {
    constructor(userRepository, sessionRepository, userPresenter) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.userPresenter = userPresenter;
    }
    execute(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findAndCompareUserCreds(params);
            if (!user) {
                throw new Error("Login or password is incorrect");
            }
            const result = yield this.sessionRepository.createTokens(user);
            return this.userPresenter.formatWithToken(result);
        });
    }
};
exports.SignInUseCaseImpl = SignInUseCaseImpl;
exports.SignInUseCaseImpl = SignInUseCaseImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.UserRepository)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.SessionRepository)),
    tslib_1.__param(2, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.UserPresenter)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], SignInUseCaseImpl);
//# sourceMappingURL=index.js.map