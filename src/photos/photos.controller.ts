import { Controller, Get, Param, Post, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Photos } from './entities/photos.entity';
import { Repository } from 'typeorm';
import { diskStorage } from 'multer';
import { extname, join } from 'path';



@Controller('api')
export class PhotosController {
  constructor(private readonly photosService: PhotosService, @InjectRepository(Photos) private readonly photosRepository: Repository<Photos>) { }



  @Post('uploadPhotos')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files', 20, {
    storage: diskStorage({
      destination: './uploads/photo/photos',
      filename: (req, file, cb) => {
        extname(file.originalname)
        cb(null, `${file.originalname}`)
      }
    })
  }))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req) {
    for (let i = 0; i < files.length; i++) {
      await this.photosRepository.save({
        photo: files[i].filename,
        user: req.user.id,
      })
    }
  }

  @Get('getAllPhotos')
  @UseGuards(JwtAuthGuard)
  getAllPhotos(@Req() req) {
    return this.photosService.getAllPhotos(req.user.id)
  }

  @Get('getPhotos/:id')
  async getPhotos(@Param() id, @Res() res) {
    const photos = await this.photosService.getPhotos(id)
    return res.sendFile(join(process.cwd(), 'uploads/photo/photos/'+ photos.photo))
  }

}

