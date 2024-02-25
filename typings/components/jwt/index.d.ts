import jwt, { verify } from "jsonwebtoken";
import { ServerAccessConfigManager } from "../../config";
export interface Jwt {
    verify(token: string): ReturnType<typeof verify>;
    sign<T>(params: SignParams<T>): string;
    decode<R>(token: string): R;
}
export declare class JwtImpl implements Jwt {
    private readonly accessConfig;
    private readonly secretKey;
    constructor(accessConfig: ServerAccessConfigManager);
    verify(token: string): string | jwt.JwtPayload;
    sign<T>(params: SignParams<T>): string;
    decode<R>(token: string): R;
}
export interface SignParams<T> {
    payload: {
        key: string;
        data: T;
    };
    expirationTime: string;
}
