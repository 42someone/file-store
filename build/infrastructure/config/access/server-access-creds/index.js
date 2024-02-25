"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerAccessTokenNames = exports.ServerAccessCredsConfigImpl = void 0;
class ServerAccessCredsConfigImpl {
    constructor(params) {
        this.tokens = {
            [ServerAccessTokenNames.JwtSecret]: params[ServerAccessTokenNames.JwtSecret],
            [ServerAccessTokenNames.PasswordSaltRounds]: params[ServerAccessTokenNames.PasswordSaltRounds]
        };
    }
    getByName(name) {
        return this.tokens[name];
    }
}
exports.ServerAccessCredsConfigImpl = ServerAccessCredsConfigImpl;
var ServerAccessTokenNames;
(function (ServerAccessTokenNames) {
    ServerAccessTokenNames["JwtSecret"] = "JWT_SECRET";
    ServerAccessTokenNames["PasswordSaltRounds"] = "PASSWORD_SALT_ROUNDS";
})(ServerAccessTokenNames || (exports.ServerAccessTokenNames = ServerAccessTokenNames = {}));
//# sourceMappingURL=index.js.map