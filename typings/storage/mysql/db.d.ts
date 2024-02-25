import * as Infrastructure from "../../infrastructure";
import { StorageConfig } from "../../infrastructure";
import { DataSource } from "typeorm";
export interface MysqlStorage extends Infrastructure.Storage<DataSource> {
}
export declare class MysqlStorageImpl implements MysqlStorage {
    private datasource;
    connect(config: StorageConfig, entities: Function[]): Promise<void>;
    close(): Promise<void>;
    getDB(): DataSource;
}
