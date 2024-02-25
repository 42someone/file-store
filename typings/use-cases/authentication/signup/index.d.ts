import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
export interface SignupUseCase extends Infrastructure.UseCase<SignupParams, Promise<Presenters.WithTokenResponse>> {
}
export declare class SignupUseCaseImpl implements SignupUseCase {
    private readonly userRepository;
    private readonly sessionRepository;
    private readonly userPresenter;
    constructor(userRepository: Repositories.UserRepository, sessionRepository: Repositories.SessionRepository, userPresenter: Presenters.UserPresenter);
    execute(params: SignupParams): Promise<any>;
}
export interface SignupParams {
    login: string;
    password: string;
}
