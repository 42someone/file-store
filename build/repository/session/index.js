"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRepositoryImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const dependency_identifiers_1 = require("../../dependencies/dependency-identifiers");
const Storage = tslib_1.__importStar(require("../../storage"));
const Components = tslib_1.__importStar(require("../../components"));
const shared_1 = require("../../storage/mysql/shared");
let SessionRepositoryImpl = class SessionRepositoryImpl {
    constructor(database, jwt) {
        this.database = database;
        this.jwt = jwt;
        this.activeSessionsTable = this.database.getDB().getRepository(Storage.ActiveSessions);
        this.usersTable = this.database.getDB().getRepository(Storage.User);
    }
    createTokens(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const uuid = crypto.randomUUID();
            const bearerToken = yield this.createBearerToken(user, uuid);
            const refreshToken = this.jwt.sign({
                payload: {
                    data: {
                        user_id: user.getId(),
                        uuid
                    },
                    key: "payload"
                },
                expirationTime: "10m"
            });
            return {
                bearerToken,
                refreshToken
            };
        });
    }
    refreshToken(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const uuid = crypto.randomUUID();
            return yield this.createBearerToken(user, uuid);
        });
    }
    createBearerToken(domainUser, uuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bearerToken = this.jwt.sign({
                payload: {
                    data: {
                        user_id: domainUser.getId(),
                        uuid: uuid
                    },
                    key: "payload"
                },
                expirationTime: "30s"
            });
            const user = Storage.entityToSchema({
                name: shared_1.TableNames.Users,
                entity: domainUser
            });
            const newSession = this.activeSessionsTable.create({
                user: user,
                uuid
            });
            yield this.activeSessionsTable.save(newSession);
            return bearerToken;
        });
    }
    getValueFromToken(token) {
        try {
            return this.jwt.decode(token);
        }
        catch (e) {
            return null;
        }
    }
    isTokenActive(uuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return !!(yield this.activeSessionsTable.findOneBy({ uuid }));
        });
    }
    removeToken(tokenUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.activeSessionsTable.delete({ uuid: tokenUUID });
        });
    }
};
exports.SessionRepositoryImpl = SessionRepositoryImpl;
exports.SessionRepositoryImpl = SessionRepositoryImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.MySQLStorage)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.Jwt)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], SessionRepositoryImpl);
//# sourceMappingURL=index.js.map