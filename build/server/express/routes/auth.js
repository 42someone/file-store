"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validators_1 = require("../validators");
const dependencies_1 = require("../../../dependencies");
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
const Middleware = tslib_1.__importStar(require("../middleware"));
const AuthRouter = (0, express_1.Router)();
exports.AuthRouter = AuthRouter;
AuthRouter.post("/signup", (0, express_validator_1.checkSchema)(validators_1.SigupParamsValidatorSchema), Middleware.checkValidation, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const params = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
    // user creation
    const signupUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.SignupUseCase);
    const signupResponse = yield signupUseCase.execute(params);
    res.status(201).json(signupResponse);
}));
AuthRouter.post("/signin", (0, express_validator_1.checkSchema)(validators_1.SignInParamsValidatorSchema), Middleware.checkValidation, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const params = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
    // user login
    const signInUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.SignInUseCase);
    try {
        const signInResponse = yield signInUseCase.execute(params);
        return res.status(201).json(signInResponse);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}));
AuthRouter.post("/signin/new_token", (0, express_validator_1.checkSchema)(validators_1.RefreshTokenSchema), Middleware.checkValidation, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const params = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
    const RefreshTokenUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.RefreshTokenUseCase);
    try {
        const result = yield RefreshTokenUseCase.execute(params);
        res.status(201).json(result);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}));
AuthRouter.get("/logout", Middleware.IsAuthenticated, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const LogoutUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.LogoutUseCase);
    try {
        const tokenPayload = req["token_payload"];
        yield LogoutUseCase.execute({ session_uuid: tokenPayload.uuid });
        res.status(200).json({ message: "Logout success" });
    }
    catch (e) {
        res.status(400).json({ message: e.message, stack: e.stack });
    }
}));
//# sourceMappingURL=auth.js.map