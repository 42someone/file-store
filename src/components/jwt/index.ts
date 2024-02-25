import {inject, injectable} from "inversify";
import jwt, {verify} from "jsonwebtoken"

import {AccessConfigNames, ServerAccessConfigManager} from "../../config";
import {Symbols} from "../../dependencies/dependency-identifiers";
import {ServerAccessTokenNames} from "../../infrastructure";
import {PARAM_TYPES} from "inversify/lib/constants/metadata_keys";

export interface Jwt {
    verify(token: string): ReturnType<typeof verify>
    sign<T>(params: SignParams<T>): string
    decode<R>(token: string): R
}
@injectable()
export class JwtImpl implements Jwt {
    private readonly secretKey: string;
    constructor(
        @inject((Symbols.ServerAccessConfig)) private readonly accessConfig: ServerAccessConfigManager
    ) {
        this.secretKey = accessConfig.getConfig(AccessConfigNames.FileStoreServer).getByName<string>(ServerAccessTokenNames.JwtSecret)
    }
    verify(token: string) {
        return jwt.verify(token, this.secretKey)
    }

    sign<T>(params: SignParams<T>) {
        return jwt.sign({[params.payload.key]: params.payload.data}, this.secretKey, {
            algorithm: "HS256",
            expiresIn: params.expirationTime,
        })
    }

    public decode<R>(token: string): R {
        return jwt.decode(token) as R
    }
}

export interface SignParams<T> {
    payload: {
        key: string
        data: T
    }
    expirationTime: string
}



