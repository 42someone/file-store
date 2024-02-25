"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfigNames = exports.ServerConfigManagerImpl = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const inversify_1 = require("inversify");
const Infrastructure = tslib_1.__importStar(require("../../infrastructure"));
let ServerConfigManagerImpl = class ServerConfigManagerImpl {
    constructor() {
        this.configs = [];
    }
    construct() {
        const fileStoreServer = new Infrastructure.ServerConfig({
            host: process.env.FILE_STORE_SERVER_HOST || "localhost",
            port: +(process.env.FILE_STORE_SERVER_PORT || 3000)
        });
        this.configs.push({
            name: ServerConfigNames.FileStore,
            config: fileStoreServer
        });
    }
    getConfig(name) {
        const foundConfigDetails = this.configs.find((c) => c.name === name);
        if (!foundConfigDetails) {
            throw new Error(`No config by name ${name} is found!`);
        }
        return foundConfigDetails.config;
    }
};
exports.ServerConfigManagerImpl = ServerConfigManagerImpl;
exports.ServerConfigManagerImpl = ServerConfigManagerImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ServerConfigManagerImpl);
var ServerConfigNames;
(function (ServerConfigNames) {
    ServerConfigNames["FileStore"] = "FILE_STORE";
})(ServerConfigNames || (exports.ServerConfigNames = ServerConfigNames = {}));
//# sourceMappingURL=index.js.map