import express, {Express} from "express"

import * as Infrastructure from "../../infrastructure";
import {RouterDetails} from "./routes";

export interface ExpressServer extends Infrastructure.Server {
    initializeRouters(routers: RouterDetails[]): ExpressServer
}

export class ExpressServerImpl implements ExpressServer {
    private server: Express;
    private readonly config: Infrastructure.ServerConfig;
    private areRoutersInitialized: boolean = false
    constructor(config: Infrastructure.ServerConfig) {
        this.server = express();
        this.server.use(express.json())
        this.config = config
    }
    public async start(): Promise<void> {
        if(!this.areRoutersInitialized) {
            throw new Error("Routers are not initialized. Please call initialize function before starting server!")
        }
        const host = this.config.getHost()
        const port = this.config.getPort()
        this.server.listen(port, host, () => {
            console.log("Your app is running")
        })
    }

    public async stop(): Promise<void> {
    }

    public initializeRouters(routers: RouterDetails[]) {
        routers.forEach(({router, basePath})     => {
            this.server.use(basePath, router)
        })
        this.areRoutersInitialized = true
        return this
    }
}

