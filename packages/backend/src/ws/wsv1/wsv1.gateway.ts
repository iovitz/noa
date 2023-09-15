import { Inject, LoggerService } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Server, Socket } from 'socket.io';
import { EventName } from 'src/common/const/events';
import { EventTypes } from 'src/common/type/events';
import { PrismaService } from 'src/global/prisma/prisma.service';

@WebSocketGateway({
  path: '/ws/v1',
})
export class Wsv1Gateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
  ) {}

  @WebSocketServer() server: Server;
  users = 0;

  // https://juejin.cn/post/7225171762395824188
  async handleConnection(client: Socket) {
    try {
      const query = client.request.url?.split('?')[1];
      const session = new URLSearchParams(query).get('session');
      const sessionItem = await this.prismaService.session.findFirst({
        where: {
          session,
        },
        select: {
          expires: true,
          userid: true,
        },
      });
      if (!sessionItem) throw Error('Invalid Session');

      // 校验时间
      const { expires, userid } = sessionItem;
      if (Number(expires) < Date.now()) {
        throw new Error('Expiration of certification');
      }

      client.request.userid = userid;

      // 保存session
      await this.prismaService.socketClientId.create({
        data: {
          userid: client.request.userid,
          clientid: client.id,
        },
      });
      this.logger.log(
        {
          userid: client.request.userid,
          clientId: client.id,
        },
        '链接成功',
      );
    } catch (error) {
      client.emit('Unauthorized');
      this.logger.error(error, 'invalid token');
    }
  }

  async handleDisconnect(client: Socket) {
    this.prismaService.socketClientId.delete({
      where: {
        clientid: client.id,
      },
    });
    this.logger.log(client.id, '取消连接');
  }

  @SubscribeMessage('events')
  async handleEvent(client: Socket, data: string) {
    this.logger.verbose('sss');
    return data;
  }

  @SubscribeMessage('hello')
  async handleMessage(client: Socket, payload: string) {
    this.logger.log(payload, '说hello');

    client.emit('hello', 'server hello payload');
  }

  @OnEvent(EventName.ApplyFriend)
  async handleOrderCreatedEvent(payload: EventTypes[EventName.ApplyFriend]) {
    const { userid, from, reason } = payload;
    const sessions = await this.prismaService.socketClientId.findMany({
      where: {
        userid,
      },
    });
    const expiredClientIds: string[] = [];
    sessions.forEach(({ clientid }) => {
      const clientSocket = this.server.sockets.sockets.get(clientid);
      // 如果没有client说明已经过期，删除clientid
      if (!clientSocket) {
        expiredClientIds.push(clientid);
        return;
      }
      clientSocket.emit('NewFriendApply', {
        from,
        reason,
      });
    });
    // 删除不使用的clientID
    this.prismaService.socketClientId.deleteMany({
      where: {
        clientid: {
          in: expiredClientIds,
        },
      },
    });
  }
}
