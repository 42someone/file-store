export interface Factory<P, T> {
    construct(params: P): T
}

export enum ServerTypes {
    Express="EXPRESS"
}