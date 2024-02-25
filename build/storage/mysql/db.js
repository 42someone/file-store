"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlStorageImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
let MysqlStorageImpl = class MysqlStorageImpl {
    connect(config, entities) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.datasource = yield new typeorm_1.DataSource({
                    type: "mysql",
                    host: config.getHost(),
                    port: config.getPort(),
                    username: config.getAuthUsername(),
                    password: config.getAuthPwd(),
                    entities: entities,
                    database: config.getConnectionDB(),
                    synchronize: true,
                    logging: false
                }).initialize();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    close() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.datasource.destroy();
        });
    }
    getDB() {
        return this.datasource;
    }
};
exports.MysqlStorageImpl = MysqlStorageImpl;
exports.MysqlStorageImpl = MysqlStorageImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MysqlStorageImpl);
//# sourceMappingURL=db.js.map