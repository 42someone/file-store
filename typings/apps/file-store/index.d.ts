import * as Infrastructure from "../../infrastructure";
import { ServerConfigManager } from "../../config";
import { ServerFactory } from "../../factory";
export declare class FileStoreApplicationImpl implements Infrastructure.Application {
    private serverFactory;
    private serverConfigManager;
    constructor(serverFactory: ServerFactory, serverConfigManager: ServerConfigManager);
    run(): Promise<void>;
    private stop;
    private prepareRoutes;
}
