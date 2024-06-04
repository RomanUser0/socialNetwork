import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('createUser')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body)
  }

  @Post('getUser')
  getUser(@Body() id) {
    return this.userService.getUser(id)
  }


}
