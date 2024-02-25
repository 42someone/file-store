"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactoryImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Domain = tslib_1.__importStar(require("../../domain"));
let UserFactoryImpl = class UserFactoryImpl {
    construct(params) {
        return new Domain.User(params.id, params.login, params.password);
    }
};
exports.UserFactoryImpl = UserFactoryImpl;
exports.UserFactoryImpl = UserFactoryImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], UserFactoryImpl);
//# sourceMappingURL=index.js.map