import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesAppGaeway } from './messages.appGateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { Chats } from './entities/chats.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chats, User])],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesAppGaeway],
  exports: [TypeOrmModule]
})
export class MessagesModule {}
