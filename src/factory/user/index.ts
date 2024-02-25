import {injectable} from "inversify";

import * as Infrastructure from "../../infrastructure";
import * as Domain from "../../domain";

export interface UserFactory extends Infrastructure.Factory<Params, Domain.User> {}

@injectable()
export class UserFactoryImpl implements UserFactory {
    construct(params: Params): Domain.User {
        return new Domain.User(
            params.id,
            params.login,
            params.password
        )
    }
}


interface Params {
    id: number
    login: string
    password: string
}