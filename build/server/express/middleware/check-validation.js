"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidation = void 0;
const express_validator_1 = require("express-validator");
function checkValidation(req, res, next) {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors.array());
    next();
}
exports.checkValidation = checkValidation;
//# sourceMappingURL=check-validation.js.map