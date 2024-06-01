import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('api')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) { }

  @Get('getAllFriends')
  @UseGuards(JwtAuthGuard)
  getAllFriends(@Req() req) {
    return this.friendsService.getAllFriends(req.user)
  }

  @Post('addFriend')
  @UseGuards(JwtAuthGuard)
  addFriend(@Body() body, @Req() req) {
    return this.friendsService.addFriend(req.user.id, body)
  }

  @Get('getFriend/:id')
  @UseGuards(JwtAuthGuard)
  getFriend(@Req() req, @Param('id') id) {
    return this.friendsService.getFriend(req.user.id, id)
  }
  @Get('searchFriends')
  @UseGuards(JwtAuthGuard)
  searchFriends(@Req() req) {
    return this.friendsService.searchFriends(req.user.id)
  }

}

