"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigupParamsValidatorSchema = void 0;
exports.SigupParamsValidatorSchema = {
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
//# sourceMappingURL=signup.js.map