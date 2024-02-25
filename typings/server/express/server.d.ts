import * as Infrastructure from "../../infrastructure";
import { RouterDetails } from "./routes";
export interface ExpressServer extends Infrastructure.Server {
    initializeRouters(routers: RouterDetails[]): ExpressServer;
}
export declare class ExpressServerImpl implements ExpressServer {
    private server;
    private readonly config;
    private areRoutersInitialized;
    constructor(config: Infrastructure.ServerConfig);
    start(): Promise<void>;
    stop(): Promise<void>;
    initializeRouters(routers: RouterDetails[]): this;
}
