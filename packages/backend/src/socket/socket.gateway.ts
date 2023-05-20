import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';

@WebSocketGateway({
  port: 28258,
  cors: {
    origin: [],
  },
  transports: ['websocket'],
})
export class SocketGateway implements NestGateway {
  @WebSocketServer() server;

  private clientsArr: any[] = [];

  handleConnection(client: any) {
    console.log('有人链接了' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('取消连接诶');
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody('id') id: number): number {
    // id === messageBody.id
    return id;
  }
}
