import {NextFunction, Request, Response} from "express";

export function validatePagination(req: Request, res: Response, next: NextFunction) {
    const queryParams = req.query
    req.query.list_size = checkPaginationField(queryParams.list_size, 10).toString()
    req.query.page = checkPaginationField(queryParams.page, 1).toString()
    next()
}

function checkPaginationField(value: any, defaultValue: number): number {
    if(!value) {
        return defaultValue
    } else if(typeof +value !== "number") {
        return defaultValue
    }
    return value
}
