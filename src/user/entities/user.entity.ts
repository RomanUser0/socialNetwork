import { Friend } from 'src/friends/entities/friend.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { Photos } from 'src/photos/entities/photos.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column('boolean', {default: false})
    isPhoto: boolean

    @OneToOne(() => Photo)
    @JoinColumn()
    photo: Photo;

    @OneToMany(() => Photos, (photos => photos.user))
    photos: Photos

    @OneToMany(() => Friend, (friends) => friends.user)
    friends: Friend;

}
