import * as Infrastructure from "../../../infrastructure";
import * as Repositories from "../../../repository";
import * as Presenters from "../../../presenters";
export interface SignInUseCase extends Infrastructure.UseCase<Params, Promise<Presenters.WithTokenResponse>> {
}
export declare class SignInUseCaseImpl implements SignInUseCase {
    private readonly userRepository;
    private readonly sessionRepository;
    private readonly userPresenter;
    constructor(userRepository: Repositories.UserRepository, sessionRepository: Repositories.SessionRepository, userPresenter: Presenters.UserPresenter);
    execute(params: Params): Promise<Presenters.WithTokenResponse>;
}
interface Params {
    login: string;
    password: string;
}
export {};
