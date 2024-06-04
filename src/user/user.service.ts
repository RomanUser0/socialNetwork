import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService) { }


  async createUser(body: CreateUserDto) {

    const user = await this.userRepository.findOne({ where: { email: body.email } })

    if (user) {
      throw new BadGatewayException('email already exsist')
    }
    const passwordHash = hashSync(body.password, 8)
    const newUser = await this.userRepository.save({
      email: body.email,
      password: passwordHash,
      firstname: body.firstname,
      lastname: body.lastname
    })
    return {
      id: newUser.id,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      token: this.jwtService.sign({ id: newUser.id, email: newUser.email })
    }
  }

  async getUser(id) {
    return await this.userRepository.findOne({
      where: {
        id: id.id
      }
    })
  }



  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email
      }
    });
  }
}

