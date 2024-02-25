import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
export interface LogoutUseCase extends Infrastructure.UseCase<Params, Promise<void>> {
}
export declare class LogoutUseCaseImpl implements LogoutUseCase {
    private readonly sessionRepository;
    constructor(sessionRepository: Repositories.SessionRepository);
    execute(params: Params): Promise<void>;
}
interface Params {
    session_uuid: string;
}
export {};
