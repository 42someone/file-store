import {injectable, inject} from "inversify";

import * as Infrastructure from "../../../infrastructure";
import * as Domain from "../../../domain";
import * as Presenters from "../../../presenters";
import * as Repositories from "../../../repository";
import {Symbols} from "../../../dependencies/dependency-identifiers";

export interface GetInfoUseCase extends Infrastructure.UseCase<Params, Promise<Presenters.UserPresenterResponse>> {}

@injectable()
export class GetInfoUseCaseImpl implements GetInfoUseCase {
    constructor(
        @inject(Symbols.UserRepository) private readonly userRepository: Repositories.UserRepository,
        @inject(Symbols.UserPresenter) private readonly userPresenter: Presenters.UserPresenter,
    ) {}

    public async execute(params: Params): Promise<Presenters.UserPresenterResponse> {
        let foundUser: Domain.User;
        try {
            foundUser = await this.userRepository.findById(params.id)
        } catch (e) {
            throw new Error(JSON.stringify({message: "Internar server error", stack: e["stack"]}))
        }

        if(!foundUser) {
            throw new Error("User not found")
        }
        return this.userPresenter.format({entity: foundUser})
    }

}
interface Params {
    id: number
}