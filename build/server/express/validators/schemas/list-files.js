"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFilesQuerySchema = void 0;
exports.ListFilesQuerySchema = {
    list_size: {
        in: "query",
        isNumeric: {
            if: checkInput.call(this, 10)
        },
        optional: true
    },
    page: {
        in: "query",
        isNumeric: {
            if: checkInput.call(this, 1)
        },
        optional: true
    }
};
function checkInput(defaultValue) {
    return function (input, meta) {
        if (!input) {
            return defaultValue;
        }
        return input;
    };
}
//# sourceMappingURL=list-files.js.map