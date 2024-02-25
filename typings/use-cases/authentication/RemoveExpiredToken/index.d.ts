import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
export interface RemoveExpiredToken extends Infrastructure.UseCase<Params, Promise<void>> {
}
export declare class RemoveExpiredTokenImpl implements RemoveExpiredToken {
    private readonly sessionRepository;
    constructor(sessionRepository: Repositories.SessionRepository);
    execute(params: Params): Promise<void>;
}
interface Params {
    expired_token: string;
}
export {};
