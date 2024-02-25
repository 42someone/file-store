import * as Infrastructure from "../../infrastructure";
export interface ServerConfigManager extends Infrastructure.ConfigManager<ServerConfigNames, Infrastructure.ServerConfig> {
}
export declare class ServerConfigManagerImpl implements ServerConfigManager {
    private readonly configs;
    construct(): void;
    getConfig(name: ServerConfigNames): Infrastructure.ServerConfig;
}
export declare enum ServerConfigNames {
    FileStore = "FILE_STORE"
}
