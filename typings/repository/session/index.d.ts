import * as Domain from "../../domain";
import * as Storage from "../../storage";
import * as Components from "../../components";
export interface SessionRepository {
    createTokens(user: Domain.User): Promise<TokenizedResponse>;
    refreshToken(user: Domain.User): Promise<string>;
    getValueFromToken<R>(token: string): R;
    isTokenActive(uuid: string): Promise<boolean>;
    removeToken(uuid: string): Promise<void>;
}
export declare class SessionRepositoryImpl implements SessionRepository {
    private readonly database;
    private readonly jwt;
    private readonly activeSessionsTable;
    private readonly usersTable;
    constructor(database: Storage.MysqlStorage, jwt: Components.Jwt);
    createTokens(user: Domain.User): Promise<TokenizedResponse>;
    refreshToken(user: Domain.User): Promise<string>;
    private createBearerToken;
    getValueFromToken<R>(token: string): R;
    isTokenActive(uuid: string): Promise<boolean>;
    removeToken(tokenUUID: string): Promise<void>;
}
interface TokenizedResponse {
    bearerToken: string;
    refreshToken: string;
}
export interface TokenPayload {
    payload: TokenPayloadData;
}
export interface TokenPayloadData {
    user_id: number;
    uuid: string;
}
export {};
