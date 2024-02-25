import {config} from "dotenv";
config()
import {injectable} from "inversify";

import * as Infrastructure from "../../infrastructure";

export interface StorageConfigManager extends Infrastructure.ConfigManager<StorageConfigNames, Infrastructure.StorageConfig>{}

@injectable()
export class StorageConfigManagerImpl implements StorageConfigManager {
    private readonly configs: Infrastructure.ConfigDetails<Infrastructure.StorageConfig>[] = [];

    construct() {
        const mysqlConfig = new Infrastructure.StorageConfig({
            host: process.env.MYSQL_DB_HOST || "localhost",
            port: +(process.env.MYSQL_DB_PORT || 3306),
            connectionDB: process.env.MYSQL_DB_NAME || "test",
            auth: {
                username: process.env.MYSQL_DB_USERNAME || "",
                password: process.env.MYSQL_DB_PASSWORD || "",
            }
        })

        this.configs.push({
            name: StorageConfigNames.FileStore,
            config: mysqlConfig
        })
    }

    getConfig(name: StorageConfigNames): Infrastructure.StorageConfig {
        const foundConfigDetails = this.configs.find((c) =>  c.name === name)
        if(!foundConfigDetails) {
            throw new Error(`No config by name ${name} is found!`)
        }
        return foundConfigDetails.config
    }
}

export enum StorageConfigNames {
    FileStore="FILE_STORE"
}