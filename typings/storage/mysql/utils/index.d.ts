import { TableNames } from "../shared";
import * as Domain from "../../../domain";
import { ActiveSessions, User } from "../schemas";
export declare function entityToSchema(params: ToUserSchemaParams): User;
export declare function entityToSchema(params: ToActiveSessionSchemaParams): ActiveSessions;
interface ToUserSchemaParams {
    name: TableNames.Users;
    entity: Domain.User;
}
interface ToActiveSessionSchemaParams {
    name: TableNames.ActiveSessions;
    entity: Domain.ActiveSessions;
}
export {};
