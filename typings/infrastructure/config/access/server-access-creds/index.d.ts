import { AccessConfig } from "../base";
export interface ServerAccessCredsConfig extends AccessConfig<ServerAccessTokenNames> {
}
export declare class ServerAccessCredsConfigImpl implements ServerAccessCredsConfig {
    private readonly tokens;
    constructor(params: Tokens);
    getByName<R>(name: ServerAccessTokenNames): R;
}
type Tokens = {
    [K in ServerAccessTokenNames]: string | Tokens;
};
export declare enum ServerAccessTokenNames {
    JwtSecret = "JWT_SECRET",
    PasswordSaltRounds = "PASSWORD_SALT_ROUNDS"
}
export {};
