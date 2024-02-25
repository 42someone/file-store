"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInParamsValidatorSchema = void 0;
exports.SignInParamsValidatorSchema = {
    login: {
        isString: true,
        isEmpty: false,
        errorMessage: "Login must be string"
    },
    password: {
        isString: true,
        isEmpty: false,
        errorMessage: "Password must be string"
    }
};
//# sourceMappingURL=signin.js.map