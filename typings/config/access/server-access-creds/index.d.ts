import * as Infrastructure from "../../../infrastructure";
export interface ServerAccessConfigManager extends Infrastructure.ConfigManager<AccessConfigNames, Infrastructure.ServerAccessCredsConfig> {
}
export declare class ServerAccessConfigManagerImpl implements ServerAccessConfigManager {
    private configs;
    construct(): void;
    getConfig(name: AccessConfigNames): Infrastructure.ServerAccessCredsConfig;
}
export declare enum AccessConfigNames {
    FileStoreServer = "FILE_STORE_SERVER_CREDS"
}
