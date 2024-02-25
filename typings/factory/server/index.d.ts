import * as Infrastructure from "../../infrastructure";
export interface ServerFactory extends Infrastructure.Factory<Params, Infrastructure.Server> {
}
interface Params {
    type: Infrastructure.ServerTypes;
    config: Infrastructure.ServerConfig;
}
export declare class ServerFactoryImpl implements ServerFactory {
    construct(params: Params): Infrastructure.Server;
    private createExpressServer;
}
export {};
