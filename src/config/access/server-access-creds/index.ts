import {config} from "dotenv";

config()

import {injectable} from "inversify";

import * as Infrastructure from "../../../infrastructure";

export interface ServerAccessConfigManager extends Infrastructure.ConfigManager<AccessConfigNames, Infrastructure.ServerAccessCredsConfig> {}

@injectable()
export class ServerAccessConfigManagerImpl implements ServerAccessConfigManager {
    private configs: Infrastructure.ConfigDetails<Infrastructure.ServerAccessCredsConfig>[] = []

    construct() {
        const fileStoreAccessConfig = new Infrastructure.ServerAccessCredsConfigImpl({
            [Infrastructure.ServerAccessTokenNames.JwtSecret]: process.env.FILE_STORE_JWT_SECRET,
            [Infrastructure.ServerAccessTokenNames.PasswordSaltRounds  ]: process.env.FILE_STORE_PASSWORD_SALT_ROUNDS,
        })

        this.configs.push({config: fileStoreAccessConfig, name: AccessConfigNames.FileStoreServer})
    }

    public getConfig(name: AccessConfigNames) {
        return this.configs.find((c) => c.name === name).config
    }


}

export enum AccessConfigNames {
    FileStoreServer = "FILE_STORE_SERVER_CREDS"
}