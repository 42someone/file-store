import {inject, injectable} from "inversify";
import {Repository} from "typeorm";
import bcrypt from "bcrypt"

import * as Domain from "../../domain";
import {Symbols} from "../../dependencies/dependency-identifiers";
import * as Storage from "../../storage";
import * as Factories from "../../factory";
import * as Config from "../../config";
import * as Components from "../../components";
import {ServerAccessTokenNames} from "../../infrastructure";

export interface UserRepository {
    create(params: CreateParams): Promise<Domain.User>
    findAndCompareUserCreds(params: LoginParams): Promise<Domain.User>
    findById(id: number): Promise<Domain.User>
}
@injectable()
export class UserRepositoryImpl implements UserRepository {
    private readonly usersTable: Repository<Storage.User>;
    constructor(
        @inject(Symbols.MySQLStorage) private readonly storage: Storage.MysqlStorage,
        @inject(Symbols.UserFactory) private readonly userFactory: Factories.UserFactory,
        @inject(Symbols.Jwt) private readonly jwt: Components.Jwt,
        @inject(Symbols.ServerAccessConfig) private readonly accessConfig: Config.ServerAccessConfigManager,
    ) {
        this.usersTable = this.storage.getDB().getRepository(Storage.User)
    }

    public async create(params: CreateParams): Promise<Domain.User> {
        const salt = this.accessConfig.getConfig(Config.AccessConfigNames.FileStoreServer).getByName<string>(ServerAccessTokenNames.PasswordSaltRounds)
        const hashedPassword = await bcrypt.hash(params.password, +salt)
        const storageUser = this.usersTable.create({
            login: params.login,
            password: hashedPassword
        })

        await this.usersTable.save(storageUser)

        return this.toEntity(storageUser)
    }

    public async findAndCompareUserCreds(params: LoginParams): Promise<Domain.User> {
        const userByLogin = await this.usersTable.findOneBy({login: params.login})
        if(!userByLogin) {
            return null
        }
        const passwordMatch = await bcrypt.compare(params.password, userByLogin.password)
        if(!passwordMatch) {
            return null
        }
        return this.toEntity(userByLogin)
    }

    public async findById(id: number): Promise<Domain.User> {
        const user = await this.usersTable.findOneBy({id: id})
        return user ? this.toEntity(user) : null
    }

    private toEntity(user: Storage.User) {
        return this.userFactory.construct({
            id: user.id,
            login: user.login,
            password: user.password,
        })
    }
}

interface CreateParams {
    login: string
    password: string
}

interface LoginParams {
    login: string
    password: string
}

interface TokenizedRespone {
    bearerToken: string
    refreshToken: string
}