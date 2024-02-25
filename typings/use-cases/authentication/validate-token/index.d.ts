import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Components from "../../../components";
import * as UseCases from "../../index";
export interface ValidateTokenUseCase extends Infrastructure.UseCase<Params, Promise<Repositories.TokenPayloadData>> {
}
export declare class ValidateTokenUseCaseImpl implements ValidateTokenUseCase {
    private readonly jwtComponent;
    private readonly SessionRepository;
    private readonly IsTokenActiveUseCase;
    private readonly RemoveExpiredTokenUseCase;
    constructor(jwtComponent: Components.Jwt, SessionRepository: Repositories.SessionRepository, IsTokenActiveUseCase: UseCases.IsTokenActiveUseCase, RemoveExpiredTokenUseCase: UseCases.RemoveExpiredTokenUseCase);
    execute(params: Params): Promise<Repositories.TokenPayloadData>;
}
interface Params {
    token: string;
}
export {};
