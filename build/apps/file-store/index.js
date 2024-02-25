"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStoreApplicationImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const dependency_identifiers_1 = require("../../dependencies/dependency-identifiers");
const Infrastructure = tslib_1.__importStar(require("../../infrastructure"));
const config_1 = require("../../config");
const Servers = tslib_1.__importStar(require("../../server"));
let FileStoreApplicationImpl = class FileStoreApplicationImpl {
    constructor(serverFactory, serverConfigManager) {
        this.serverFactory = serverFactory;
        this.serverConfigManager = serverConfigManager;
    }
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const serverConfig = this.serverConfigManager.getConfig(config_1.ServerConfigNames.FileStore);
            const server = this.serverFactory.construct({
                type: Infrastructure.ServerTypes.Express,
                config: serverConfig
            });
            const routers = this.prepareRoutes();
            server.initializeRouters(routers);
            yield server.start();
            process.on("SIGINT", this.stop.bind(this, server));
            process.on("SIGHUP", this.stop.bind(this, server));
        });
    }
    stop(server) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield server.stop();
            process.exit(0);
        });
    }
    prepareRoutes() {
        return [
            {
                router: Servers.AuthRouter,
                basePath: Servers.BASE_PATH.Auth
            },
            {
                router: Servers.InfoRouter,
                basePath: Servers.BASE_PATH.Info
            },
            {
                router: Servers.FileRouter,
                basePath: Servers.BASE_PATH.File
            },
        ];
    }
};
exports.FileStoreApplicationImpl = FileStoreApplicationImpl;
exports.FileStoreApplicationImpl = FileStoreApplicationImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.ServerFactory)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.ServerConfig)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], FileStoreApplicationImpl);
//# sourceMappingURL=index.js.map