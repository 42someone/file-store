"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationParamsValidatorSchema = void 0;
exports.RegistrationParamsValidatorSchema = {
    login: {
        isString: true,
        errorMessage: "Login must be string"
    },
    password: {
        isString: true,
        errorMessage: "Password must be string"
    }
};
//# sourceMappingURL=registration.js.map