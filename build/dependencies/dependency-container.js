"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyContainer = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const dependency_identifiers_1 = require("./dependency-identifiers");
// Apps
const apps_1 = require("../apps");
//Factory
const factory_1 = require("../factory");
// Storage
const storage_1 = require("../storage");
//Config
const config_1 = require("../config");
exports.DependencyContainer = new inversify_1.Container();
// Factories
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.FileStoreApp)
    .to(apps_1.FileStoreApplicationImpl);
// Factories
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.ServerFactory)
    .to(factory_1.ServerFactoryImpl)
    .inSingletonScope();
// Storage
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.MySQLStorage)
    .to(storage_1.MysqlStorageImpl)
    .inSingletonScope();
//Configs
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.ServerConfig)
    .to(config_1.ServerConfigManagerImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.StorageConfig)
    .to(config_1.StorageConfigManagerImpl)
    .inSingletonScope();
//# sourceMappingURL=dependency-container.js.map