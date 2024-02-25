export interface AccessConfig<Names> {
    getByName<R>(name: Names): R
}