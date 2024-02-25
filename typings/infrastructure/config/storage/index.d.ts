export declare class StorageConfig {
    private readonly host;
    private readonly port;
    private readonly connectionDB;
    private readonly auth;
    constructor(params: Params);
    getHost(): string;
    getPort(): number;
    getConnectionDB(): string;
    getAuthUsername(): string;
    getAuthPwd(): string;
}
interface Params {
    host: string;
    port: number;
    connectionDB: string;
    auth: Auth;
}
interface Auth {
    username: string;
    password: string;
}
export {};
