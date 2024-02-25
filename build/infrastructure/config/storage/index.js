"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageConfig = void 0;
class StorageConfig {
    constructor(params) {
        this.host = params.host;
        this.port = params.port;
        this.connectionDB = params.connectionDB;
        this.auth = params.auth;
    }
    getHost() {
        return this.host;
    }
    getPort() {
        return this.port;
    }
    getConnectionDB() {
        return this.connectionDB;
    }
    getAuthUsername() {
        return this.auth.username;
    }
    getAuthPwd() {
        return this.auth.password;
    }
}
exports.StorageConfig = StorageConfig;
//# sourceMappingURL=index.js.map