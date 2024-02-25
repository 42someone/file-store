import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
import { ValidateTokenUseCase } from "../validate-token";
import { RemoveExpiredTokenUseCase } from "../remove-expired-token";
export interface RefreshTokenUseCase extends Infrastructure.UseCase<RefreshTokenUseCaseParams, Promise<Presenters.RefreshTokenPresenterResponse>> {
}
export declare class RefreshTokenUseCaseImpl implements RefreshTokenUseCase {
    private readonly userRepository;
    private readonly sessionRepository;
    private readonly userPresenter;
    private readonly ValidateTokenUseCase;
    private readonly RemoveExpiredTokenUseCase;
    constructor(userRepository: Repositories.UserRepository, sessionRepository: Repositories.SessionRepository, userPresenter: Presenters.UserPresenter, ValidateTokenUseCase: ValidateTokenUseCase, RemoveExpiredTokenUseCase: RemoveExpiredTokenUseCase);
    execute(params: RefreshTokenUseCaseParams): Promise<Presenters.WithTokenResponse>;
}
export interface RefreshTokenUseCaseParams {
    refresh_token: string;
}
