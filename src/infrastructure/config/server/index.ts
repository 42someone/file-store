export class ServerConfig {
    private readonly host: string;
    private readonly port: number;
    constructor (
        params: {
            host: string,
            port: number
        }
    ){
        this.host = params.host
        this.port = params.port
    }

    public getHost() {
        return this.host;
    }

    public getPort() {
        return this.port;
    }
}

