"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const shared_1 = require("../shared");
let File = class File {
};
exports.File = File;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], File.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: false
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "view_name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: false
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "system_name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: false
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "extension", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: false
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "mime_type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: false
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "content_type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: false
    }),
    tslib_1.__metadata("design:type", Number)
], File.prototype, "size", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "date"
    }),
    tslib_1.__metadata("design:type", Date)
], File.prototype, "upload_time", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "date"
    }),
    tslib_1.__metadata("design:type", Date)
], File.prototype, "update_time", void 0);
exports.File = File = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: shared_1.TableNames.Files })
], File);
//# sourceMappingURL=File.js.map