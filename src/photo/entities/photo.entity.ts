import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    photo: string;


    @OneToOne(() => User)
    @JoinColumn()
    user: User

}
