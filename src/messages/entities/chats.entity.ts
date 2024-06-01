import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Chats {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    abonent_1: number;

    @Column()
    abonent_2: number;

}