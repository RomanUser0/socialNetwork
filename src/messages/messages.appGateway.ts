import { MessagesService } from './messages.service';
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'



@WebSocketGateway(3001, {
  cors: '*' 
})
export class MessagesAppGaeway /* implements OnGatewayConnection */  {
  constructor(private readonly messagesService: MessagesService) { }


  @WebSocketServer()
  server: Server
/* 
  handleConnection(client: any) {
    console.log(client.id)
  } */

  @SubscribeMessage('events')
  async handleEvent(@MessageBody() data) {
    console.log(data)
   const mess = await this.messagesService.createMessage(data)
    this.server.emit('message', mess)
  }



}
