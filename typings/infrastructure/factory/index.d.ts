export interface Factory<P, T> {
    construct(params: P): T;
}
export declare enum ServerTypes {
    Express = "EXPRESS"
}
