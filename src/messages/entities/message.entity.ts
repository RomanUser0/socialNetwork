import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    recipient: number;

    @Column()
    sender: number;

    @Column()
    nameSender: string;

    @Column({ default: false })
    isRead: boolean

   @Column()
    chats: number;

    @CreateDateColumn()
    created_at: Date
}
