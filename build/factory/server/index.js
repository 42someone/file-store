"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerFactoryImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Infrastructure = tslib_1.__importStar(require("../../infrastructure"));
const Servers = tslib_1.__importStar(require("../../server"));
let ServerFactoryImpl = class ServerFactoryImpl {
    construct(params) {
        switch (params.type) {
            case Infrastructure.ServerTypes.Express:
                return this.createExpressServer(params.config);
            default:
                return this.createExpressServer(params.config);
        }
    }
    createExpressServer(config) {
        return new Servers.ExpressServerImpl(config);
    }
};
exports.ServerFactoryImpl = ServerFactoryImpl;
exports.ServerFactoryImpl = ServerFactoryImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ServerFactoryImpl);
//# sourceMappingURL=index.js.map