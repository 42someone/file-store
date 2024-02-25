import {TableNames} from "../shared";
import * as Domain from "../../../domain";
import {ActiveSessions, User} from "../schemas";

type Params = ToUserSchemaParams | ToActiveSessionSchemaParams

export function entityToSchema(params: ToUserSchemaParams): User
export function entityToSchema(params: ToActiveSessionSchemaParams): ActiveSessions

export function entityToSchema(params: Params) {
    switch (params.name) {
        case TableNames.Users: {
            const schema = new User()
            schema.id = params.entity.getId()
            schema.login = params.entity.getLogin()
            schema.password = params.entity.getPassword()
            return schema
        }
        case TableNames.ActiveSessions: {
            const schema = new ActiveSessions()
            schema.id = params.entity.getId()
            schema.user = entityToSchema({name: TableNames.Users, entity: params.entity.getUser()})
            return schema
        }
        default:
            throw new Error("Non existing schema type")
    }
}

interface ToUserSchemaParams {
    name: TableNames.Users
    entity: Domain.User
}

interface ToActiveSessionSchemaParams {
    name: TableNames.ActiveSessions
    entity: Domain.ActiveSessions
}


