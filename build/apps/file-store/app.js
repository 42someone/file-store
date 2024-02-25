"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStoreApplicationImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const dependencies_1 = require("../../dependencies");
const Servers = tslib_1.__importStar(require("../../server"));
let FileStoreApplicationImpl = class FileStoreApplicationImpl {
    constructor(serverFactory, serverConfigManager) {
        this.serverFactory = serverFactory;
        this.serverConfigManager = serverConfigManager;
    }
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const serverConfig = this.serverConfigManager.getConfig(ServerConfigNames.FileStore)
            // const server = this.serverFactory.construct({
            //     type: ServerTypes.Express,
            //     config: serverConfig
            // }) as Servers.ExpressServer
            // const routers: Servers.RouterDetails[] = this.prepareRoutes()
            //
            // server.initializeRouters(routers)
            // console.log("in app")
            // await server.start()
            //
            // process.on("SIGINT", this.stop.bind(this, server))
        });
    }
    stop(server) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield server.stop();
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
    tslib_1.__param(0, (0, inversify_1.inject)(dependencies_1.Symbols.ServerFactory)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependencies_1.Symbols.ServerConfig)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], FileStoreApplicationImpl);
//# sourceMappingURL=app.js.map