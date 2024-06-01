import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";





@Controller('api')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Post('getMessage')
    @UseGuards(JwtAuthGuard)
    getMessage(@Body() body, @Req() req) {
        return this.messagesService.getMessage(body, req.user.id)
    }

    @Get('getChats')
    @UseGuards(JwtAuthGuard)
    getChats(@Req() req) {
        return this.messagesService.getChats(req.user.id)
    }

}