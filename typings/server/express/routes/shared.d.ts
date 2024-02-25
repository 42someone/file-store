import { IRouter } from "express";
export declare enum BASE_PATH {
    Auth = "/auth",
    Info = "/info",
    File = "/file"
}
export interface RouterDetails {
    router: IRouter;
    basePath: string;
}
