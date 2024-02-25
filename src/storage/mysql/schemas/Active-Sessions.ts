import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne} from "typeorm";

import {TableNames} from "../shared"
import {User} from "./User";
@Entity({name: TableNames.ActiveSessions})
export class ActiveSessions {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "text",
        nullable: false,
    })
    uuid: string

    @ManyToOne(() => User)
    @JoinColumn()
    user: User
}

