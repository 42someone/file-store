"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenterImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
let UserPresenterImpl = class UserPresenterImpl {
    format(params) {
        return {
            id: params.entity.getId()
        };
    }
    formatWithToken(params) {
        return {
            bearer_token: params.bearerToken,
            refresh_token: params.refreshToken
        };
    }
    formatToBearerToken(params) {
        return {
            bearer_token: params.bearerToken
        };
    }
};
exports.UserPresenterImpl = UserPresenterImpl;
exports.UserPresenterImpl = UserPresenterImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], UserPresenterImpl);
//# sourceMappingURL=index.js.map