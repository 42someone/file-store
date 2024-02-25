export declare class User {
    private readonly id;
    private readonly login;
    private readonly password;
    constructor(id: number, login: string, password: string);
    getId(): number;
    getLogin(): string;
    getPassword(): string;
}
