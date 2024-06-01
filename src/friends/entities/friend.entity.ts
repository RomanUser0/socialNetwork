import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Friend {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.friends)
    user: User;

    @Column()
    friend: number;
}
