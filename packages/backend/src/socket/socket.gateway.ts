import { Inject, LoggerService } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
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
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @WebSocketServer() server;
  users = 0;

  async handleConnection(client, paylaod: string) {
    this.logger.log(client.id, '链接');
  }

  async handleDisconnect(client: any) {
    this.logger.log(client.id, '取消连接');
  }

  @SubscribeMessage('events')
  handleEvent(client: Socket, data: string): string {
    this.logger.verbose(client);
    return data;
  }

  @SubscribeMessage('hello')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(payload, '说hello');

    client.emit('hello', 'server hello paylaod');
  }
}
