export interface ConfigManager<Names, Config> {
    construct(): void

    getConfig(name: Names): Config
}

export interface ConfigDetails<Config> {
    name: string
    config: Config
}