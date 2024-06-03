import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, User])],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [TypeOrmModule]
})
export class PhotoModule {}
