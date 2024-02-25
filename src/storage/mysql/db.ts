import { injectable } from "inversify";
import * as Infrastructure from "../../infrastructure";
import {StorageConfig} from "../../infrastructure";
import {DataSource} from "typeorm";

export interface MysqlStorage extends Infrastructure.Storage<DataSource> {}

@injectable()
export class MysqlStorageImpl implements MysqlStorage {
    private datasource: DataSource
    public async connect(config: StorageConfig, entities: Function[]): Promise<void> {
        try {
            this.datasource = await new DataSource({
                type: "mysql",
                host: config.getHost(),
                port: config.getPort(),
                username: config.getAuthUsername(),
                password: config.getAuthPwd(),
                entities: entities,
                database: config.getConnectionDB(),
                synchronize: true,
                logging: false
            }).initialize()
        } catch (e) {
            console.log(e)
        }

    }

    public async close() {
        await this.datasource.destroy()
    }

    public getDB() {
        return this.datasource
    }
}