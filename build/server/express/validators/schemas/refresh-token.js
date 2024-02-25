"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenSchema = void 0;
exports.RefreshTokenSchema = {
    refresh_token: {
        in: "body",
        isString: true,
        errorMessage: "Refresh token not provided",
        isEmpty: false,
        isLength: {
            options: {
                min: 15
            }
        }
    }
};
//# sourceMappingURL=refresh-token.js.map