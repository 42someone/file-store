import {Schema} from "express-validator"

export const SigupParamsValidatorSchema: Schema ={
    login: {
        isString: true,
        isEmpty: false,
        errorMessage: "Login must be string"
    },
    password: {
        isString: true,
        isEmpty: false,
        errorMessage: "Password must be string"
    }
}