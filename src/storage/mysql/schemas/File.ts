import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TableNames} from "../shared";
import {User} from "./User";

@Entity({name: TableNames.Files})
export class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        nullable: false
    })
    view_name: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    system_name: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    extension: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    mime_type: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    content_type: string;

    @Column({
        type: "int",
        nullable: false
    })
    size: number

    @Column({
        type: "date"
    })
    upload_time: Date

    @Column({
        type: "date"
    })
    update_time: Date

}