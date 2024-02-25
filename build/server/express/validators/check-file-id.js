"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileId = void 0;
const express_validator_1 = require("express-validator");
function checkFileId() {
    return (0, express_validator_1.param)("id")
        .isNumeric()
        .withMessage("Invalid Id");
}
exports.checkFileId = checkFileId;
//# sourceMappingURL=check-file-id.js.map