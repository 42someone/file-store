"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateTokenUseCaseImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
const Repositories = tslib_1.__importStar(require("../../../repository"));
const Components = tslib_1.__importStar(require("../../../components"));
const UseCases = tslib_1.__importStar(require("../../index"));
let ValidateTokenUseCaseImpl = class ValidateTokenUseCaseImpl {
    constructor(jwtComponent, SessionRepository, IsTokenActiveUseCase, RemoveExpiredTokenUseCase) {
        this.jwtComponent = jwtComponent;
        this.SessionRepository = SessionRepository;
        this.IsTokenActiveUseCase = IsTokenActiveUseCase;
        this.RemoveExpiredTokenUseCase = RemoveExpiredTokenUseCase;
    }
    execute(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let tokenPayload;
            // verify token
            try {
                tokenPayload = this.jwtComponent.verify(params.token);
            }
            catch (e) {
                // if not valid
                if (e.message === "jwt expired") {
                    // -- if expired
                    // --- remove token
                    // --- throw error token expired
                    // await this.RemoveExpiredTokenUseCase.execute({expired_token: params.token})
                    throw new Error("Expired Token");
                }
                // -- if other
                // -- throw error token invalid
                throw new Error("Invalid token");
            }
            // check if token is active in active-sessions
            try {
                yield this.IsTokenActiveUseCase.execute({ token_uuid: tokenPayload.payload.uuid });
            }
            catch (e) {
                // if not throw error
                throw new Error("Session expired");
            }
            // return token payload data
            return tokenPayload.payload;
        });
    }
};
exports.ValidateTokenUseCaseImpl = ValidateTokenUseCaseImpl;
exports.ValidateTokenUseCaseImpl = ValidateTokenUseCaseImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.Jwt)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.SessionRepository)),
    tslib_1.__param(2, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.IsTokenActiveUseCase)),
    tslib_1.__param(3, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.RemoveExpiredTokenUseCase)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object])
], ValidateTokenUseCaseImpl);
//# sourceMappingURL=index.js.map