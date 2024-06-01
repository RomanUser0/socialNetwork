import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photos } from './entities/photos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photos])],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports: [TypeOrmModule]
})
export class PhotosModule {}
