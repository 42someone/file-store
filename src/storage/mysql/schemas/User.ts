import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from "typeorm";

import {TableNames} from "../shared"
@Entity({name: TableNames.Users})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    login: string

    @Column('varchar')
    password: string
}

