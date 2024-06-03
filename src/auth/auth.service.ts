import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/photo/entities/photo.entity';
import { Repository } from 'typeorm';
import { Friend } from 'src/friends/entities/friend.entity';


@Injectable()
export class AuthService {

  constructor(private usersService: UserService, private jwtService: JwtService,
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Friend) private readonly friendRepository: Repository<Friend>
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const exsistPassword = compareSync(password, user.password)
    if (user && exsistPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      token: this.jwtService.sign(payload),
    };
  }

  async getProfile(user) {
    const idFriends = []
    const friends = await this.friendRepository.find({
      where: {
        user: {
          id: user.id
        }
      }
    })
     for(let i = 0; i < friends.length; i++) {
      idFriends.push(friends[i].friend)
    } 
    const { password, ...payload } = await this.usersService.findOne(user.email)
    return {
      ...payload,
      lengthFriends: idFriends
    }
  }
}
