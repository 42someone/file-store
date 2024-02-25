import 'reflect-metadata';
import { Container } from "inversify";

import {Symbols} from "./dependency-identifiers";
import * as Infrastructure from "../infrastructure";

// Apps
import * as Apps from "../apps"

// UseCases
import * as UseCases from "../use-cases";

// Repositories
import * as Repositories from "../repository";

//Factory
import * as Factories from "../factory";

//Presenter
import * as Presenters from "../presenters";

// Storage
import * as Storage from "../storage";

//Config
import * as Config from "../config"

//Components
import * as Components from "../components"
import {DownloadFileUseCase} from "../use-cases/file/download";

export const DependencyContainer = new Container()

// Applications
DependencyContainer.bind<Infrastructure.Application>(Symbols.FileStoreApp)
    .to(Apps.FileStoreApplicationImpl)

// UseCases
DependencyContainer.bind<UseCases.SignupUseCase>(Symbols.SignupUseCase)
    .to(UseCases.SignupUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.SignInUseCase>(Symbols.SignInUseCase)
    .to(UseCases.SignInUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.RefreshTokenUseCase>(Symbols.RefreshTokenUseCase)
    .to(UseCases.RefreshTokenUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.GetInfoUseCase>(Symbols.GetInfoUseCase)
    .to(UseCases.GetInfoUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.IsTokenActiveUseCase>(Symbols.IsTokenActiveUseCase)
    .to(UseCases.IsTokenActiveUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.RemoveExpiredTokenUseCase>(Symbols.RemoveExpiredTokenUseCase)
    .to(UseCases.RemoveExpiredTokenUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.ValidateTokenUseCase>(Symbols.ValidateTokenUseCase)
    .to(UseCases.ValidateTokenUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.LogoutUseCase>(Symbols.LogoutUseCase)
    .to(UseCases.LogoutUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.UploadFileUseCase>(Symbols.UploadFileUseCase)
    .to(UseCases.UploadFileUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.GetFilesUseCase>(Symbols.GetFilesUseCase)
    .to(UseCases.GetFilesUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.GetOneFileUseCase>(Symbols.GetOneFileUseCase)
    .to(UseCases.GetOneFileUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.DeleteFileUseCase>(Symbols.DeleteFileUseCase)
    .to(UseCases.DeleteFileUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.ReplaceFileUseCase>(Symbols.ReplaceFileUseCase)
    .to(UseCases.ReplaceFileUseCaseImpl)
    .inSingletonScope()

DependencyContainer.bind<UseCases.DownloadFileUseCase>(Symbols.DownloadFileUseCase)
    .to(UseCases.DownloadFileUseCaseImpl)
    .inSingletonScope()

// Repositories
DependencyContainer.bind<Repositories.UserRepository>(Symbols.UserRepository)
    .to(Repositories.UserRepositoryImpl)
    .inSingletonScope()

DependencyContainer.bind<Repositories.SessionRepository>(Symbols.SessionRepository)
    .to(Repositories.SessionRepositoryImpl)
    .inSingletonScope()

DependencyContainer.bind<Repositories.FileRepository>(Symbols.FileRepository)
    .to(Repositories.FileRepositoryImpl)
    .inSingletonScope()

// Factories
DependencyContainer.bind<Factories.ServerFactory>(Symbols.ServerFactory)
    .to(Factories.ServerFactoryImpl)
    .inSingletonScope()

DependencyContainer.bind<Factories.UserFactory>(Symbols.UserFactory)
    .to(Factories.UserFactoryImpl)
    .inSingletonScope()

DependencyContainer.bind<Factories.ActiveSessionFactory>(Symbols.ActiveSessionFactory)
    .to(Factories.ActiveSessionFactoryImpl)
    .inSingletonScope()

DependencyContainer.bind<Factories.FileFactory>(Symbols.FileFactory)
    .to(Factories.FileFactoryImpl)
    .inSingletonScope()

// Presenters
DependencyContainer.bind<Presenters.UserPresenter>(Symbols.UserPresenter)
    .to(Presenters.UserPresenterImpl)
    .inSingletonScope()

DependencyContainer.bind<Presenters.FilePresenter>(Symbols.FilePresenter)
    .to(Presenters.FilePresenterImpl)
    .inSingletonScope()

// Storage
DependencyContainer.bind<Storage.MysqlStorage>(Symbols.MySQLStorage)
    .to(Storage.MysqlStorageImpl)
    .inSingletonScope()

//Configs
DependencyContainer.bind<Config.ServerConfigManager>(Symbols.ServerConfig)
    .to(Config.ServerConfigManagerImpl)
    .inSingletonScope()

DependencyContainer.bind<Config.StorageConfigManager>(Symbols.StorageConfig)
    .to(Config.StorageConfigManagerImpl)
    .inSingletonScope()

DependencyContainer.bind<Config.ServerAccessConfigManager>(Symbols.ServerAccessConfig)
    .to(Config.ServerAccessConfigManagerImpl)
    .inSingletonScope()

// Components
DependencyContainer.bind<Components.Jwt>(Symbols.Jwt)
    .to(Components.JwtImpl)
    .inSingletonScope()