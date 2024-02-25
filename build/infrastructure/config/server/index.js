"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
class ServerConfig {
    constructor(params) {
        this.host = params.host;
        this.port = params.port;
    }
    getHost() {
        return this.host;
    }
    getPort() {
        return this.port;
    }
}
exports.ServerConfig = ServerConfig;
//# sourceMappingURL=index.js.map