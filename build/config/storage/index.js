"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageConfigNames = exports.StorageConfigManagerImpl = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const inversify_1 = require("inversify");
const Infrastructure = tslib_1.__importStar(require("../../infrastructure"));
let StorageConfigManagerImpl = class StorageConfigManagerImpl {
    constructor() {
        this.configs = [];
    }
    construct() {
        const mysqlConfig = new Infrastructure.StorageConfig({
            host: process.env.MYSQL_DB_HOST || "localhost",
            port: +(process.env.MYSQL_DB_PORT || 3306),
            connectionDB: process.env.MYSQL_DB_NAME || "test",
            auth: {
                username: process.env.MYSQL_DB_USERNAME || "",
                password: process.env.MYSQL_DB_PASSWORD || "",
            }
        });
        this.configs.push({
            name: StorageConfigNames.FileStore,
            config: mysqlConfig
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
exports.StorageConfigManagerImpl = StorageConfigManagerImpl;
exports.StorageConfigManagerImpl = StorageConfigManagerImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], StorageConfigManagerImpl);
var StorageConfigNames;
(function (StorageConfigNames) {
    StorageConfigNames["FileStore"] = "FILE_STORE";
})(StorageConfigNames || (exports.StorageConfigNames = StorageConfigNames = {}));
//# sourceMappingURL=index.js.map