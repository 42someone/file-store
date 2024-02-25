"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInfoUseCaseImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Presenters = tslib_1.__importStar(require("../../../presenters"));
const Repositories = tslib_1.__importStar(require("../../../repository"));
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
let GetInfoUseCaseImpl = class GetInfoUseCaseImpl {
    constructor(userRepository, userPresenter) {
        this.userRepository = userRepository;
        this.userPresenter = userPresenter;
    }
    execute(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let foundUser;
            try {
                foundUser = yield this.userRepository.findById(params.id);
            }
            catch (e) {
                throw new Error(JSON.stringify({ message: "Internar server error", stack: e["stack"] }));
            }
            if (!foundUser) {
                throw new Error("User not found");
            }
            return this.userPresenter.format({ entity: foundUser });
        });
    }
};
exports.GetInfoUseCaseImpl = GetInfoUseCaseImpl;
exports.GetInfoUseCaseImpl = GetInfoUseCaseImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.UserRepository)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.UserPresenter)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], GetInfoUseCaseImpl);
//# sourceMappingURL=index.js.map