import * as Infrastructure from "../../infrastructure";
import * as Domain from "../../domain";
export interface UserPresenter extends Infrastructure.Presenter<UserPresenterParams, UserPresenterResponse> {
    formatWithToken(params: RegisterParams): WithTokenResponse;
    formatToBearerToken(params: RefreshTokenPresenterParams): RefreshTokenPresenterResponse;
}
export declare class UserPresenterImpl implements UserPresenter {
    format(params: UserPresenterParams): UserPresenterResponse;
    formatWithToken(params: RegisterParams): WithTokenResponse;
    formatToBearerToken(params: RefreshTokenPresenterParams): RefreshTokenPresenterResponse;
}
interface UserPresenterParams {
    entity: Domain.User;
}
export interface UserPresenterResponse {
    id: number;
}
interface RegisterParams {
    bearerToken: string;
    refreshToken: string;
}
export interface WithTokenResponse {
    bearer_token: string;
    refresh_token?: string;
}
export interface RefreshTokenPresenterParams {
    bearerToken: string;
}
export interface RefreshTokenPresenterResponse {
    bearer_token: string;
}
export {};
