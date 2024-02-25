import * as Infrastructure from "../../infrastructure";
import * as Domain from "../../domain";
export interface UserFactory extends Infrastructure.Factory<Params, Domain.User> {
}
export declare class UserFactoryImpl implements UserFactory {
    construct(params: Params): Domain.User;
}
interface Params {
    id: number;
    login: string;
    password: string;
}
export {};
