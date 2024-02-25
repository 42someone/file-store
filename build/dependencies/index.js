"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyContainer = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("inversify");
const dependency_identifiers_1 = require("./dependency-identifiers");
// Apps
const Apps = tslib_1.__importStar(require("../apps"));
// UseCases
const UseCases = tslib_1.__importStar(require("../use-cases"));
// Repositories
const Repositories = tslib_1.__importStar(require("../repository"));
//Factory
const Factories = tslib_1.__importStar(require("../factory"));
//Presenter
const Presenters = tslib_1.__importStar(require("../presenters"));
// Storage
const Storage = tslib_1.__importStar(require("../storage"));
//Config
const Config = tslib_1.__importStar(require("../config"));
//Components
const Components = tslib_1.__importStar(require("../components"));
exports.DependencyContainer = new inversify_1.Container();
// Applications
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.FileStoreApp)
    .to(Apps.FileStoreApplicationImpl);
// UseCases
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.SignupUseCase)
    .to(UseCases.SignupUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.SignInUseCase)
    .to(UseCases.SignInUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.RefreshTokenUseCase)
    .to(UseCases.RefreshTokenUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.GetInfoUseCase)
    .to(UseCases.GetInfoUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.IsTokenActiveUseCase)
    .to(UseCases.IsTokenActiveUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.RemoveExpiredTokenUseCase)
    .to(UseCases.RemoveExpiredTokenUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.ValidateTokenUseCase)
    .to(UseCases.ValidateTokenUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.LogoutUseCase)
    .to(UseCases.LogoutUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.UploadFileUseCase)
    .to(UseCases.UploadFileUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.GetFilesUseCase)
    .to(UseCases.GetFilesUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.GetOneFileUseCase)
    .to(UseCases.GetOneFileUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.DeleteFileUseCase)
    .to(UseCases.DeleteFileUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.ReplaceFileUseCase)
    .to(UseCases.ReplaceFileUseCaseImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.DownloadFileUseCase)
    .to(UseCases.DownloadFileUseCaseImpl)
    .inSingletonScope();
// Repositories
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.UserRepository)
    .to(Repositories.UserRepositoryImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.SessionRepository)
    .to(Repositories.SessionRepositoryImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.FileRepository)
    .to(Repositories.FileRepositoryImpl)
    .inSingletonScope();
// Factories
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.ServerFactory)
    .to(Factories.ServerFactoryImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.UserFactory)
    .to(Factories.UserFactoryImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.ActiveSessionFactory)
    .to(Factories.ActiveSessionFactoryImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.FileFactory)
    .to(Factories.FileFactoryImpl)
    .inSingletonScope();
// Presenters
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.UserPresenter)
    .to(Presenters.UserPresenterImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.FilePresenter)
    .to(Presenters.FilePresenterImpl)
    .inSingletonScope();
// Storage
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.MySQLStorage)
    .to(Storage.MysqlStorageImpl)
    .inSingletonScope();
//Configs
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.ServerConfig)
    .to(Config.ServerConfigManagerImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.StorageConfig)
    .to(Config.StorageConfigManagerImpl)
    .inSingletonScope();
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.ServerAccessConfig)
    .to(Config.ServerAccessConfigManagerImpl)
    .inSingletonScope();
// Components
exports.DependencyContainer.bind(dependency_identifiers_1.Symbols.Jwt)
    .to(Components.JwtImpl)
    .inSingletonScope();
//# sourceMappingURL=index.js.map