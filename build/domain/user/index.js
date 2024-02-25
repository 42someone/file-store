"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, login, password) {
        this.id = id;
        this.login = login;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    getLogin() {
        return this.login;
    }
    getPassword() {
        return this.password;
    }
}
exports.User = User;
//# sourceMappingURL=index.js.map