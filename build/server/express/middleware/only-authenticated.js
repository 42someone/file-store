"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAuthenticated = void 0;
const tslib_1 = require("tslib");
const dependencies_1 = require("../../../dependencies");
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
function IsAuthenticated(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const ValidateTokenUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.ValidateTokenUseCase);
        const { authorization } = req.headers;
        const bearerToken = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        if (!bearerToken) {
            return res.status(401).json({ message: "User is unauthorized" });
        }
        try {
            req["token_payload"] = yield ValidateTokenUseCase.execute({ token: bearerToken });
            next();
        }
        catch (e) {
            if (e.message === "Invalid token") {
                res.status(400);
            }
            else {
                res.status(401);
            }
            return res.json({ message: e.message });
        }
    });
}
exports.IsAuthenticated = IsAuthenticated;
//# sourceMappingURL=only-authenticated.js.map