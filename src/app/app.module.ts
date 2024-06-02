import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PhotoModule } from 'src/photo/photo.module';
import { Photo } from 'src/photo/entities/photo.entity';
import { FriendsModule } from 'src/friends/friends.module';
import { Friend } from 'src/friends/entities/friend.entity';
import { PhotosModule } from 'src/photos/photos.module';
import { Photos } from 'src/photos/entities/photos.entity';
import { MessagesModule } from 'src/messages/messages.module';
import { Message } from 'src/messages/entities/message.entity';
import { Chats } from 'src/messages/entities/chats.entity';

@Module({
  imports: [ MessagesModule, PhotosModule, FriendsModule, PhotoModule, AuthModule, UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username:  'roman',
    password: '20roman20Aaa',
    database: 'social',
    entities: [User,Photo,Friend, Photos, Message, Chats],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

