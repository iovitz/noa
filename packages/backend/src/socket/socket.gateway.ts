import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { Socket } from 'socket.io';

@WebSocketGateway({
  // 域名
  namespace: '/ws',
  // 解决跨域
  // allowEIO3: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  users = 0;

  async handleConnection(client, paylaod: string) {
    console.log(client.id, '链接');
  }

  async handleDisconnect(client: any) {
    console.log(client.id, '取消链接');
  }
  @SubscribeMessage('hello')
  handleMessage(client: Socket, payload: string): void {
    console.log(client.id, '说hello', payload);
    client.emit('hello', 'server hello paylaod');
  }
}
