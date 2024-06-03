import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PhotoService {

    constructor(@InjectRepository(Photo) private readonly photoRepository: Repository<Photo>) { }

    async getPhoto(id) {
        return await this.photoRepository.findOne({
            relations: {
                user: true
            },
            where: {
                user: { id: id.id }
            }
        })
    }

    async getIsPhoto(body) {
        const photo = await this.photoRepository.findOne({
            where: {
                user: {
                    id: body
                }
            }
        })
        return photo.isPhoto
    }
}

