import {injectable} from "inversify";

import * as Infrastructure from "../../infrastructure";
import * as Domain from "../../domain";

export interface UserPresenter extends Infrastructure.Presenter<UserPresenterParams, UserPresenterResponse>{
    formatWithToken(params: RegisterParams): WithTokenResponse
    formatToBearerToken(params: RefreshTokenPresenterParams): RefreshTokenPresenterResponse
}

@injectable()
export class UserPresenterImpl implements UserPresenter {
    format(params: UserPresenterParams): UserPresenterResponse {
        return {
            id: params.entity.getId()
        }
    }

    formatWithToken(params: RegisterParams): WithTokenResponse {
        return {
            bearer_token: params.bearerToken,
            refresh_token: params.refreshToken
        }
    }

    formatToBearerToken(params: RefreshTokenPresenterParams): RefreshTokenPresenterResponse {
        return {
            bearer_token: params.bearerToken
        }
    }
}

interface UserPresenterParams {
    entity: Domain.User
}

export interface UserPresenterResponse {
    id: number
}

interface RegisterParams {
    bearerToken: string
    refreshToken: string
}

export interface WithTokenResponse {
    bearer_token: string
    refresh_token?: string
}

export interface RefreshTokenPresenterParams {
    bearerToken: string
}

export interface RefreshTokenPresenterResponse {
    bearer_token: string
}