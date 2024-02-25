"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePagination = void 0;
const express_validator_1 = require("express-validator");
function validatePagination(field, defaultValue) {
    return (0, express_validator_1.query)(field)
        .isNumeric()
        .default(defaultValue)
        .withMessage(`Invalid ${field} value`);
}
exports.validatePagination = validatePagination;
//# sourceMappingURL=list-files.js.map