export class StorageConfig {
    private readonly host: string
    private readonly port: number
    private readonly connectionDB: string
    private readonly auth: Auth

    constructor(
        params: Params
    ) {
        this.host = params.host
        this.port = params.port
        this.connectionDB = params.connectionDB
        this.auth = params.auth
    }

    public getHost(): string {
        return this.host
    }

    public getPort(): number {
        return this.port
    }

    public getConnectionDB(): string {
        return this.connectionDB
    }

    public getAuthUsername(): string {
        return this.auth.username
    }

    public getAuthPwd(): string {
        return this.auth.password
    }
}

interface Params {
    host: string
    port: number
    connectionDB: string
    auth: Auth
}

interface Auth {
    username: string
    password: string
}
