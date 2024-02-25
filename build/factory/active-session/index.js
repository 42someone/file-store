"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveSessionFactoryImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Domain = tslib_1.__importStar(require("../../domain"));
let ActiveSessionFactoryImpl = class ActiveSessionFactoryImpl {
    construct(params) {
        return new Domain.ActiveSessions(params.id, params.user);
    }
};
exports.ActiveSessionFactoryImpl = ActiveSessionFactoryImpl;
exports.ActiveSessionFactoryImpl = ActiveSessionFactoryImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ActiveSessionFactoryImpl);
//# sourceMappingURL=index.js.map