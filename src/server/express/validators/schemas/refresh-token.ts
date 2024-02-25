import {Schema} from "express-validator";
import {IsEmptyOptions, MinMaxOptions} from "express-validator/src/options";

export const RefreshTokenSchema: Schema = {
    refresh_token: {
        in: "body",
        isString: true,
        errorMessage: "Refresh token not provided",
        isEmpty: false,
        isLength: {
            options: {
                min: 15
            }
        }
    }
}