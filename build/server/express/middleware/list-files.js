"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePagination = void 0;
function validatePagination(req, res, next) {
    const queryParams = req.query;
    req.query.list_size = checkPaginationField(queryParams.list_size, 10).toString();
    req.query.page = checkPaginationField(queryParams.page, 1).toString();
    next();
}
exports.validatePagination = validatePagination;
function checkPaginationField(value, defaultValue) {
    if (!value) {
        return defaultValue;
    }
    else if (typeof +value !== "number") {
        return defaultValue;
    }
    return value;
}
//# sourceMappingURL=list-files.js.map