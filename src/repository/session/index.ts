import {inject, injectable} from "inversify";
import {Repository} from "typeorm";

import {Symbols} from "../../dependencies/dependency-identifiers";
import * as Domain from "../../domain";
import * as Storage from "../../storage";
import * as Components from "../../components";
import {TableNames} from "../../storage/mysql/shared";
import * as path from "path";

export interface SessionRepository {
    createTokens(user: Domain.User): Promise<TokenizedResponse>
    refreshToken(user: Domain.User): Promise<string>
    getValueFromToken<R>(token: string): R
    isTokenActive(uuid: string): Promise<boolean>
    removeToken(uuid: string): Promise<void>
}

@injectable()
export class SessionRepositoryImpl implements SessionRepository {
    private readonly activeSessionsTable: Repository<Storage.ActiveSessions>
    private readonly usersTable: Repository<Storage.User>
    constructor(
        @inject(Symbols.MySQLStorage) private readonly database: Storage.MysqlStorage,
        @inject(Symbols.Jwt) private readonly jwt: Components.Jwt,
    ) {
        this.activeSessionsTable = this.database.getDB().getRepository(Storage.ActiveSessions)
        this.usersTable = this.database.getDB().getRepository(Storage.User)
    }
    public async createTokens(user: Domain.User): Promise<TokenizedResponse> {
        const uuid = crypto.randomUUID()
        const bearerToken = await this.createBearerToken(user, uuid)

        const refreshToken = this.jwt.sign<TokenPayloadData>({
            payload: {
                data: {
                    user_id: user.getId(),
                    uuid
                },
                key: "payload"
            },
            expirationTime: "10m"
        })
        return {
            bearerToken,
            refreshToken
        }
    }

    public async refreshToken(user: Domain.User): Promise<string> {
        const uuid = crypto.randomUUID()
        return await this.createBearerToken(user, uuid)
    }

    private async createBearerToken(domainUser: Domain.User, uuid: string): Promise<string> {
        const bearerToken = this.jwt.sign<TokenPayloadData>({
            payload: {
                data: {
                    user_id: domainUser.getId(),
                    uuid: uuid
                },
                key: "payload"
            },
            expirationTime: "30s"
        })

        const user = Storage.entityToSchema({
            name: TableNames.Users,
            entity: domainUser
        })
        const newSession = this.activeSessionsTable.create({
            user: user,
            uuid
        })

        await this.activeSessionsTable.save(newSession)
        return bearerToken
    }

    public getValueFromToken<R>(token: string): R  {
        try {
            return this.jwt.decode<R>(token)
        } catch (e) {
            return null
        }
    }

    public async isTokenActive(uuid: string): Promise<boolean> {
        return !!(await this.activeSessionsTable.findOneBy({uuid}))
    }

    public async removeToken(tokenUUID: string): Promise<void> {
        await this.activeSessionsTable.delete({uuid: tokenUUID})
    }

}

interface TokenizedResponse {
    bearerToken: string
    refreshToken: string
}

export interface TokenPayload {
    payload: TokenPayloadData
}

export interface TokenPayloadData {
    user_id: number
    uuid: string
}
