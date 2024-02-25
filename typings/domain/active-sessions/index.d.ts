import { User } from "../user";
export declare class ActiveSessions {
    private readonly id;
    private readonly user;
    constructor(id: number, user: User);
    getId(): number;
    getUser(): User;
}
