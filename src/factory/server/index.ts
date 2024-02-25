import {injectable} from "inversify";

import * as Infrastructure from "../../infrastructure";
import * as Servers from "../../server";

export interface ServerFactory extends Infrastructure.Factory<Params, Infrastructure.Server> {}


interface Params {
    type: Infrastructure.ServerTypes
    config: Infrastructure.ServerConfig
}


@injectable()
export class ServerFactoryImpl implements ServerFactory {
    construct(params: Params): Infrastructure.Server {
        switch (params.type) {
            case Infrastructure.ServerTypes.Express:
                return this.createExpressServer(params.config)
            default:
                return this.createExpressServer(params.config)
        }
    }

    private createExpressServer(config: Infrastructure.ServerConfig): Servers.ExpressServer {
        return new Servers.ExpressServerImpl(config)
    }
}