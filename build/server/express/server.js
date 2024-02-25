"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServerImpl = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
class ExpressServerImpl {
    constructor(config) {
        this.areRoutersInitialized = false;
        this.server = (0, express_1.default)();
        this.server.use(express_1.default.json());
        this.config = config;
    }
    start() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.areRoutersInitialized) {
                throw new Error("Routers are not initialized. Please call initialize function before starting server!");
            }
            const host = this.config.getHost();
            const port = this.config.getPort();
            this.server.listen(port, host, () => {
                console.log("Your app is running");
            });
        });
    }
    stop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
    initializeRouters(routers) {
        routers.forEach(({ router, basePath }) => {
            this.server.use(basePath, router);
        });
        this.areRoutersInitialized = true;
        return this;
    }
}
exports.ExpressServerImpl = ExpressServerImpl;
//# sourceMappingURL=server.js.map