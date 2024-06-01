import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photos {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    photo: string;

    @ManyToOne(() => User, (user) => user.photos)
    user: User;
}
