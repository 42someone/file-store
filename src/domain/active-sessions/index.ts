import {User} from "../user";

export class ActiveSessions {
    constructor(
        private readonly id: number,
        private readonly user: User
    ) {}

    public getId(): number {
        return this.id
    }

    public getUser(): User {
        return this.user
    }
}