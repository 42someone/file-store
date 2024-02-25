"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCaseImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
const Repositories = tslib_1.__importStar(require("../../../repository"));
const Presenters = tslib_1.__importStar(require("../../../presenters"));
let RefreshTokenUseCaseImpl = class RefreshTokenUseCaseImpl {
    constructor(userRepository, sessionRepository, userPresenter, ValidateTokenUseCase, RemoveExpiredTokenUseCase) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.userPresenter = userPresenter;
        this.ValidateTokenUseCase = ValidateTokenUseCase;
        this.RemoveExpiredTokenUseCase = RemoveExpiredTokenUseCase;
    }
    execute(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let tokenPayload;
            try {
                tokenPayload = yield this.ValidateTokenUseCase.execute({ token: params.refresh_token });
            }
            catch (e) {
                if (e.message === "Expired Token") {
                    const { uuid } = this.sessionRepository.getValueFromToken(params.refresh_token);
                    yield this.RemoveExpiredTokenUseCase.execute({ session_uuid: uuid });
                }
            }
            const user = yield this.userRepository.findById(+tokenPayload.user_id);
            if (!user) {
                throw new Error("Invalid Token. No user found from token");
            }
            const result = yield this.sessionRepository.refreshToken(user);
            return this.userPresenter.formatToBearerToken({ bearerToken: result });
        });
    }
};
exports.RefreshTokenUseCaseImpl = RefreshTokenUseCaseImpl;
exports.RefreshTokenUseCaseImpl = RefreshTokenUseCaseImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.UserRepository)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.SessionRepository)),
    tslib_1.__param(2, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.UserPresenter)),
    tslib_1.__param(3, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.ValidateTokenUseCase)),
    tslib_1.__param(4, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.RemoveExpiredTokenUseCase)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], RefreshTokenUseCaseImpl);
//# sourceMappingURL=index.js.map