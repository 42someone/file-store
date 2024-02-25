import {param} from "express-validator";

export function checkFileId() {
    return param("id")
        .isNumeric()
        .withMessage("Invalid Id")
}