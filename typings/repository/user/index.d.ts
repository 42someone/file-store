import * as Domain from "../../domain";
import * as Storage from "../../storage";
import * as Factories from "../../factory";
import * as Config from "../../config";
import * as Components from "../../components";
export interface UserRepository {
    create(params: CreateParams): Promise<Domain.User>;
    findAndCompareUserCreds(params: LoginParams): Promise<Domain.User>;
    findById(id: number): Promise<Domain.User>;
}
export declare class UserRepositoryImpl implements UserRepository {
    private readonly storage;
    private readonly userFactory;
    private readonly jwt;
    private readonly accessConfig;
    private readonly usersTable;
    constructor(storage: Storage.MysqlStorage, userFactory: Factories.UserFactory, jwt: Components.Jwt, accessConfig: Config.ServerAccessConfigManager);
    create(params: CreateParams): Promise<Domain.User>;
    findAndCompareUserCreds(params: LoginParams): Promise<Domain.User>;
    findById(id: number): Promise<Domain.User>;
    private toEntity;
}
interface CreateParams {
    login: string;
    password: string;
}
interface LoginParams {
    login: string;
    password: string;
}
export {};
