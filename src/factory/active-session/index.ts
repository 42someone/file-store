import {injectable} from "inversify";

import * as Infrastructure from "../../infrastructure";
import * as Domain from "../../domain";

export interface ActiveSessionFactory extends Infrastructure.Factory<Params, Domain.ActiveSessions> {}

interface Params {
    id: number
    user: Domain.User
}
@injectable()
export class ActiveSessionFactoryImpl implements ActiveSessionFactory {
    construct(params: Params): Domain.ActiveSessions {
        return new Domain.ActiveSessions(params.id, params.user)
    }
}