import {StorageConfig} from "../config";

export interface Storage<DB> {
    connect(config: StorageConfig, entities: Function[]): Promise<void>
    close(): Promise<void>
    getDB(): DB
}