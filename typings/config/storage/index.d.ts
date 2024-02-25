import * as Infrastructure from "../../infrastructure";
export interface StorageConfigManager extends Infrastructure.ConfigManager<StorageConfigNames, Infrastructure.StorageConfig> {
}
export declare class StorageConfigManagerImpl implements StorageConfigManager {
    private readonly configs;
    construct(): void;
    getConfig(name: StorageConfigNames): Infrastructure.StorageConfig;
}
export declare enum StorageConfigNames {
    FileStore = "FILE_STORE"
}
