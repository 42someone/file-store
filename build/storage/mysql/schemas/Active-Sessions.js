"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveSessions = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const shared_1 = require("../shared");
const User_1 = require("./User");
let ActiveSessions = class ActiveSessions {
};
exports.ActiveSessions = ActiveSessions;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ActiveSessions.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], ActiveSessions.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", User_1.User)
], ActiveSessions.prototype, "user", void 0);
exports.ActiveSessions = ActiveSessions = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: shared_1.TableNames.ActiveSessions })
], ActiveSessions);
//# sourceMappingURL=Active-Sessions.js.map