import {AccessConfig} from "../base";

export interface ServerAccessCredsConfig extends AccessConfig<ServerAccessTokenNames> {}
export class ServerAccessCredsConfigImpl implements ServerAccessCredsConfig {
    private readonly tokens: Tokens;
    constructor (params: Tokens) {
        this.tokens = {
            [ServerAccessTokenNames.JwtSecret]: params[ServerAccessTokenNames.JwtSecret],
            [ServerAccessTokenNames.PasswordSaltRounds]: params[ServerAccessTokenNames.PasswordSaltRounds]
        }
    }

    getByName<R>(name: ServerAccessTokenNames): R {
        return <R>this.tokens[name]
    }
}

type Tokens = { [K in ServerAccessTokenNames]: string | Tokens }

export enum ServerAccessTokenNames {
    JwtSecret = "JWT_SECRET",
    PasswordSaltRounds = "PASSWORD_SALT_ROUNDS",
}