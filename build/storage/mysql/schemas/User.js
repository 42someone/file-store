"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const shared_1 = require("../shared");
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('varchar'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "login", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('varchar'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: shared_1.TableNames.Users })
], User);
//# sourceMappingURL=User.js.map