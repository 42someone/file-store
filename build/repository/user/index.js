"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const dependency_identifiers_1 = require("../../dependencies/dependency-identifiers");
const Storage = tslib_1.__importStar(require("../../storage"));
const Factories = tslib_1.__importStar(require("../../factory"));
const Config = tslib_1.__importStar(require("../../config"));
const Components = tslib_1.__importStar(require("../../components"));
const infrastructure_1 = require("../../infrastructure");
let UserRepositoryImpl = class UserRepositoryImpl {
    constructor(storage, userFactory, jwt, accessConfig) {
        this.storage = storage;
        this.userFactory = userFactory;
        this.jwt = jwt;
        this.accessConfig = accessConfig;
        this.usersTable = this.storage.getDB().getRepository(Storage.User);
    }
    create(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const salt = this.accessConfig.getConfig(Config.AccessConfigNames.FileStoreServer).getByName(infrastructure_1.ServerAccessTokenNames.PasswordSaltRounds);
            const hashedPassword = yield bcrypt_1.default.hash(params.password, +salt);
            const storageUser = this.usersTable.create({
                login: params.login,
                password: hashedPassword
            });
            yield this.usersTable.save(storageUser);
            return this.toEntity(storageUser);
        });
    }
    findAndCompareUserCreds(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userByLogin = yield this.usersTable.findOneBy({ login: params.login });
            if (!userByLogin) {
                return null;
            }
            const passwordMatch = yield bcrypt_1.default.compare(params.password, userByLogin.password);
            if (!passwordMatch) {
                return null;
            }
            return this.toEntity(userByLogin);
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersTable.findOneBy({ id: id });
            return user ? this.toEntity(user) : null;
        });
    }
    toEntity(user) {
        return this.userFactory.construct({
            id: user.id,
            login: user.login,
            password: user.password,
        });
    }
};
exports.UserRepositoryImpl = UserRepositoryImpl;
exports.UserRepositoryImpl = UserRepositoryImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.MySQLStorage)),
    tslib_1.__param(1, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.UserFactory)),
    tslib_1.__param(2, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.Jwt)),
    tslib_1.__param(3, (0, inversify_1.inject)(dependency_identifiers_1.Symbols.ServerAccessConfig)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object])
], UserRepositoryImpl);
//# sourceMappingURL=index.js.map