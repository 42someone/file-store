"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const dependency_identifiers_1 = require("../../dependencies/dependency-identifiers");
const infrastructure_1 = require("../../infrastructure");
let JwtImpl = class JwtImpl {
    constructor(accessConfig) {
        this.accessConfig = accessConfig;
        this.secretKey = accessConfig.getConfig(config_1.AccessConfigNames.FileStoreServer).getByName(infrastructure_1.ServerAccessTokenNames.JwtSecret);
    }
    verify(token) {
        return jsonwebtoken_1.default.verify(token, this.secretKey);
    }
    sign(params) {
        return jsonwebtoken_1.default.sign({ [params.payload.key]: params.payload.data }, this.secretKey, {
            algorithm: "HS256",
            expiresIn: params.expirationTime,
        });
    }
    decode(token) {
        return jsonwebtoken_1.default.decode(token);
    }
};
exports.JwtImpl = JwtImpl;
exports.JwtImpl = JwtImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)((dependency_identifiers_1.Symbols.ServerAccessConfig))),
    tslib_1.__metadata("design:paramtypes", [Object])
], JwtImpl);
//# sourceMappingURL=index.js.map