import {IRouter, Request} from "express";

export enum BASE_PATH {
    Auth = "/auth",
    Info = "/info",
    File = "/file",
}

export interface RouterDetails {
    router: IRouter
    basePath: string
}
