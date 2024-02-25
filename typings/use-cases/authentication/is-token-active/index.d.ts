import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
export interface IsTokenActiveUseCase extends Infrastructure.UseCase<Params, Promise<void>> {
}
export declare class IsTokenActiveUseCaseImpl implements IsTokenActiveUseCase {
    private readonly sessionRepository;
    constructor(sessionRepository: Repositories.SessionRepository);
    execute(params: Params): Promise<void>;
}
interface Params {
    token_uuid: string;
}
export {};
