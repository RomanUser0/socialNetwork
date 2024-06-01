import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photos } from './entities/photos.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PhotosService {


    constructor(@InjectRepository(Photos) private readonly photosRepository: Repository<Photos>) {}

    async getPhotos(id) {
        return await this.photosRepository.findOne({
            where: {
                id: id.id
            }
        })
    }

    async getAllPhotos(id) {
        return this.photosRepository.find({
            where: {
                user: { id: id }
            }
        })
    }

}

