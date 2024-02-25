export class User {
    constructor(
        private readonly id: number,
        private readonly login: string,
        private readonly password: string,
    ) {}

    public getId(): number {
        return this.id
    }

    public getLogin(): string {
        return this.login
    }

    public getPassword(): string {
        return this.password
    }
}