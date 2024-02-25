import {inject, injectable} from "inversify";

import {Symbols} from "../../dependencies/dependency-identifiers";
import * as Infrastructure from "../../infrastructure";
import {ServerConfigManager, ServerConfigNames} from "../../config";

import {ServerFactory} from "../../factory";
import * as Servers from "../../server";

@injectable()
export class FileStoreApplicationImpl implements Infrastructure.Application {
    constructor(
        @inject(Symbols.ServerFactory) private serverFactory: ServerFactory,
        @inject(Symbols.ServerConfig) private serverConfigManager: ServerConfigManager,
    ) {
    }

    public async run(): Promise<void> {
        const serverConfig = this.serverConfigManager.getConfig(ServerConfigNames.FileStore)
        const server = this.serverFactory.construct({
            type: Infrastructure.ServerTypes.Express,
            config: serverConfig
        }) as Servers.ExpressServer
        const routers: Servers.RouterDetails[] = this.prepareRoutes()

        server.initializeRouters(routers)
        await server.start()

        process.on("SIGINT", this.stop.bind(this, server))
        process.on("SIGHUP", this.stop.bind(this, server))
    }

    private async stop(server: Infrastructure.Server) {
        await server.stop()
        process.exit(0)
    }

    private prepareRoutes(): Servers.RouterDetails[] {
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
        ]
    }
}