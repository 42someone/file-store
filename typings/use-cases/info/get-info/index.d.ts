import * as Infrastructure from "../../../infrastructure";
import * as Presenters from "../../../presenters";
import * as Repositories from "../../../repository";
export interface GetInfoUseCase extends Infrastructure.UseCase<Params, Promise<Presenters.UserPresenterResponse>> {
}
export declare class GetInfoUseCaseImpl implements GetInfoUseCase {
    private readonly userRepository;
    private readonly userPresenter;
    constructor(userRepository: Repositories.UserRepository, userPresenter: Presenters.UserPresenter);
    execute(params: Params): Promise<Presenters.UserPresenterResponse>;
}
interface Params {
    id: number;
}
export {};
