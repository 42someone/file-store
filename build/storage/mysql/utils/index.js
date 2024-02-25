"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityToSchema = void 0;
const shared_1 = require("../shared");
const schemas_1 = require("../schemas");
function entityToSchema(params) {
    switch (params.name) {
        case shared_1.TableNames.Users: {
            const schema = new schemas_1.User();
            schema.id = params.entity.getId();
            schema.login = params.entity.getLogin();
            schema.password = params.entity.getPassword();
            return schema;
        }
        case shared_1.TableNames.ActiveSessions: {
            const schema = new schemas_1.ActiveSessions();
            schema.id = params.entity.getId();
            schema.user = entityToSchema({ name: shared_1.TableNames.Users, entity: params.entity.getUser() });
            return schema;
        }
        default:
            throw new Error("Non existing schema type");
    }
}
exports.entityToSchema = entityToSchema;
//# sourceMappingURL=index.js.map