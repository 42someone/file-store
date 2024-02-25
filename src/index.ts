// import express, {Express, Router} from "express"
//
// const app: Express = express()
// const router = Router()
// router.get('/info', (req, res) => {
//     res.send("your info")
// })

//db, configs, app
import {DependencyContainer} from "./dependencies"
import {Symbols} from "./dependencies/dependency-identifiers"
import * as Configs from "./config";
import {AccessConfigNames, StorageConfigNames} from "./config";
import * as Storage from "./storage";
import {Application, ServerAccessTokenNames} from "./infrastructure";

export async function fileStoreRunner() {
    DependencyContainer.load()
    DependencyContainer.get<Configs.ServerConfigManager>(Symbols.ServerConfig).construct()
    const accessConfig = DependencyContainer.get<Configs.ServerAccessConfigManager>(Symbols.ServerAccessConfig)
    accessConfig.construct()

    const storageConfigManager = DependencyContainer.get<Configs.StorageConfigManager>(Symbols.StorageConfig)
    storageConfigManager.construct()

    const entities = prepareEntities()
    const storage = DependencyContainer.get<Storage.MysqlStorage>(Symbols.MySQLStorage)
    await storage.connect(
        storageConfigManager.getConfig(StorageConfigNames.FileStore),
        entities
    )

    const server = DependencyContainer.get<Application>(Symbols.FileStoreApp)
    server.run()
}

function prepareEntities(): Function[] {
    return [
        Storage.User,
        Storage.ActiveSessions,
        Storage.File,
    ]
}

fileStoreRunner()