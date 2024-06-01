import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Any, In, Not, Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';



@Injectable()
export class FriendsService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Friend) private readonly friendRepository: Repository<Friend>,) { }


    async searchFriends(id) {
        const friends = await this.friendRepository.find({
            where: {
                user: {
                    id: id
                }
            }
        })
        const idFriend = []
        idFriend.push(id)
        for(let i = 0; i < friends.length; i++) {
           idFriend.push(friends[i].friend)
        }
        return await this.userRepository.findBy({   
                id: Not(In(idFriend)) 
        })
    }

    async getAllFriends(user) {
        const friendsarray = []
        const friends = await this.friendRepository.find({
            where: {
                user: { id: user.id }
            }
        })
        for (let i = 0; i < friends.length; i++) {
            const user = await this.userRepository.findOne({
                where: {
                    id: friends[i].friend
                }

            })
            friendsarray.push({ ...user })
        }
        return friendsarray
    }
    async addFriend(userId, friendId) {
        await this.friendRepository.save({
            user: { id: userId },
            friend: friendId.id
        })
    }
    async getFriend(userId, friendId) {
        const friends = await this.friendRepository.find({
            where: {
                user: { id: userId }
            }
        })
        const { password, ...user } = await this.userRepository.findOne({
            where: {
                id: friendId
            }

        })


        return user
    }



}

