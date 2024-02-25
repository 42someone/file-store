import {config} from "dotenv";
config()
import {injectable} from "inversify";

import * as Infrastructure from "../../infrastructure";

export interface ServerConfigManager extends Infrastructure.ConfigManager<ServerConfigNames, Infrastructure.ServerConfig> {}

@injectable()
export class ServerConfigManagerImpl implements ServerConfigManager {
    private readonly configs: Infrastructure.ConfigDetails<Infrastructure.ServerConfig>[] = [];

    construct() {
        const fileStoreServer = new Infrastructure.ServerConfig({
            host: process.env.FILE_STORE_SERVER_HOST || "localhost",
            port: +(process.env.FILE_STORE_SERVER_PORT || 3000)
        })

        this.configs.push({
            name: ServerConfigNames.FileStore,
            config: fileStoreServer
        })
    }

    getConfig(name: ServerConfigNames): Infrastructure.ServerConfig {
        const foundConfigDetails = this.configs.find((c) =>  c.name === name)
        if(!foundConfigDetails) {
            throw new Error(`No config by name ${name} is found!`)
        }
        return foundConfigDetails.config
    }
}

export enum ServerConfigNames {
    FileStore="FILE_STORE"
}