"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessConfigNames = exports.ServerAccessConfigManagerImpl = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const inversify_1 = require("inversify");
const Infrastructure = tslib_1.__importStar(require("../../../infrastructure"));
let ServerAccessConfigManagerImpl = class ServerAccessConfigManagerImpl {
    constructor() {
        this.configs = [];
    }
    construct() {
        const fileStoreAccessConfig = new Infrastructure.ServerAccessCredsConfigImpl({
            [Infrastructure.ServerAccessTokenNames.JwtSecret]: process.env.FILE_STORE_JWT_SECRET,
            [Infrastructure.ServerAccessTokenNames.PasswordSaltRounds]: process.env.FILE_STORE_PASSWORD_SALT_ROUNDS,
        });
        this.configs.push({ config: fileStoreAccessConfig, name: AccessConfigNames.FileStoreServer });
    }
    getConfig(name) {
        return this.configs.find((c) => c.name === name).config;
    }
};
exports.ServerAccessConfigManagerImpl = ServerAccessConfigManagerImpl;
exports.ServerAccessConfigManagerImpl = ServerAccessConfigManagerImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ServerAccessConfigManagerImpl);
var AccessConfigNames;
(function (AccessConfigNames) {
    AccessConfigNames["FileStoreServer"] = "FILE_STORE_SERVER_CREDS";
})(AccessConfigNames || (exports.AccessConfigNames = AccessConfigNames = {}));
//# sourceMappingURL=index.js.map