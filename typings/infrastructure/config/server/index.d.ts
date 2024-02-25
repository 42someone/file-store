export declare class ServerConfig {
    private readonly host;
    private readonly port;
    constructor(params: {
        host: string;
        port: number;
    });
    getHost(): string;
    getPort(): number;
}
