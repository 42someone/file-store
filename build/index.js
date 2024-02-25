"use strict";
// import express, {Express, Router} from "express"
//
// const app: Express = express()
// const router = Router()
// router.get('/info', (req, res) => {
//     res.send("your info")
// })
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileStoreRunner = void 0;
const tslib_1 = require("tslib");
//db, configs, app
const dependencies_1 = require("./dependencies");
const dependency_identifiers_1 = require("./dependencies/dependency-identifiers");
const config_1 = require("./config");
const Storage = tslib_1.__importStar(require("./storage"));
function fileStoreRunner() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        dependencies_1.DependencyContainer.load();
        dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.ServerConfig).construct();
        const accessConfig = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.ServerAccessConfig);
        accessConfig.construct();
        const storageConfigManager = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.StorageConfig);
        storageConfigManager.construct();
        const entities = prepareEntities();
        const storage = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.MySQLStorage);
        yield storage.connect(storageConfigManager.getConfig(config_1.StorageConfigNames.FileStore), entities);
        const server = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.FileStoreApp);
        server.run();
    });
}
exports.fileStoreRunner = fileStoreRunner;
function prepareEntities() {
    return [
        Storage.User,
        Storage.ActiveSessions,
        Storage.File,
    ];
}
fileStoreRunner();
//# sourceMappingURL=index.js.map