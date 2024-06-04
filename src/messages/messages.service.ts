import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { In, Repository } from 'typeorm';
import { Chats } from './entities/chats.entity';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class MessagesService {

    constructor(@InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        @InjectRepository(Chats) private readonly chatsRepository: Repository<Chats>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>) { }

    async createMessage(data) {

        const sender = await this.usersRepository.findOne({where: {id: data.sender}})

        const chatExist = await this.chatsRepository.findOne({
            where: {
                abonent_1: data.sender,
                abonent_2: data.recipient
            }
        })
            const chatExistRes = await this.chatsRepository.findOne({
                where: {
                    abonent_1: data.recipient,
                    abonent_2: data.sender
                }
            })
        if (chatExist?.id || chatExistRes?.id) {
            const mess = await this.messageRepository.save({
                message: data.message,
                recipient: data.recipient,
                sender: data.sender,
                chats: chatExist?.id || chatExistRes.id,
                nameSender: `${sender.firstname} ${sender.lastname}`
            })
            return mess
        }
        const chat = await this.chatsRepository.save({
            abonent_1: data.sender,
            abonent_2: data.recipient,
        })
        const mess = await this.messageRepository.save({
            message: data.message,
            recipient: data.recipient,
            sender: data.sender,
            chats: chat.id,
            nameSender: `${sender.firstname} ${sender.lastname}`

        })
        return mess
    }

    async getMessage(body, senderId) {
        const recipient = await this.messageRepository.find({
            where: {
                recipient: +body.recipient,
                sender: senderId
            }
        })
        const sender = await this.messageRepository.find({
            where: {
                recipient: senderId,
                sender: +body.recipient

            }

        })
        return [
            ...recipient,
            ...sender
        ]
    }

    async getChats(id) {
        const usersId = []
        const chatExist = await this.chatsRepository.createQueryBuilder('chats')
            .where("chats.abonent_1 = :sender", { sender: id })
            .orWhere("chats.abonent_2 = :sender", { sender: id }).getMany()
        for (let i = 0; i < chatExist.length; i++) {
            if (chatExist[i].abonent_1 != id) {
                usersId.push(chatExist[i].abonent_1)
            }
            if (chatExist[i].abonent_2 != id) {
                usersId.push(chatExist[i].abonent_2)
            }
        }
        const users = await this.usersRepository.findBy({
            id: In(usersId)
        })
        return users
    }
    

}






