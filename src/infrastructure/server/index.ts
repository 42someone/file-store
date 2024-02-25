import * as Config from "../config"
export interface Server {
    start(): Promise<void>
    stop(): Promise<void>
}