import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';


@Controller('api')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>,
    @InjectRepository(User) private readonly userRepository: Repository<User>) { }

  @Post('uploadPhoto')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: '../uploads/photo/avatar',
      filename: (req, file, cb) => {
        extname(file.originalname)
        cb(null, `${file.originalname}`)
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    await this.photoRepository.save({
      photo: file.filename,
      user: req.user.id
    })
    await this.userRepository.createQueryBuilder().update().set({isPhoto: true}).where("id = req.user.id", {id: req.user.id}).execute()
  }



  @Get('getPhoto/:id')
  async getPhoto(@Param() id, @Res() res) {
    const photo = await this.photoService.getPhoto(id)
    return res.sendFile(join(process.cwd(), '../uploads/photo/avatar/' + photo.photo))
  }
}











