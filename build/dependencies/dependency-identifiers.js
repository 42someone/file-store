"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Symbols = void 0;
exports.Symbols = {
    //Apps
    FileStoreApp: Symbol.for("FileStoreApp"),
    // UseCases
    SignupUseCase: Symbol("SignupUseCase"),
    GetInfoUseCase: Symbol("GetInfoUseCase"),
    SignInUseCase: Symbol("SignInUseCase"),
    RefreshTokenUseCase: Symbol("RefreshTokenUseCase"),
    IsTokenActiveUseCase: Symbol("IsTokenActiveUseCase"),
    RemoveExpiredTokenUseCase: Symbol("RemoveExpiredTokenUseCase"),
    ValidateTokenUseCase: Symbol("ValidateTokenUseCase"),
    LogoutUseCase: Symbol("LogoutUseCase"),
    UploadFileUseCase: Symbol("UploadFileUseCase"),
    GetFilesUseCase: Symbol("GetFilesUseCase"),
    GetOneFileUseCase: Symbol("GetOneFileUseCase"),
    DeleteFileUseCase: Symbol("DeleteFileUseCase"),
    ReplaceFileUseCase: Symbol("ReplaceFileUseCase"),
    DownloadFileUseCase: Symbol("DownloadFileUseCase"),
    // Repositories
    UserRepository: Symbol("UserRepository"),
    SessionRepository: Symbol("SessionRepository"),
    FileRepository: Symbol("FileRepository"),
    // Factories
    ServerFactory: Symbol.for("ServerFactory"),
    UserFactory: Symbol.for("UserFactory"),
    ActiveSessionFactory: Symbol.for("ActiveSessionFactory"),
    FileFactory: Symbol.for("FileFactory"),
    // Presenters
    UserPresenter: Symbol.for("UserPresenter"),
    FilePresenter: Symbol.for("FilePresenter"),
    //Storage
    MySQLStorage: Symbol.for("MySQLStorage"),
    //Configs
    ServerConfig: Symbol.for("ServerConfig"),
    StorageConfig: Symbol.for("StorageConfig"),
    ServerAccessConfig: Symbol.for("ServerAccessConfig"),
    // Components
    Jwt: Symbol.for("Jwt")
};
//# sourceMappingURL=dependency-identifiers.js.map