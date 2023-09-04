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
    const res = await this.prismaService.socketMember.create({
      data: {
        userid: client.request.userid,
        memberid: client.id,
      },
    });
    console.log(res);
    this.logger.log(
      {
        userid: client.request.userid,
        clientId: client.id,
      },
      '链接成功',
    );
  }

  async handleDisconnect(client: Socket) {
    this.prismaService.socketMember.delete({
      where: {
        memberid: client.id,
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
    const { userid, fromid, reason } = payload;
    const sessions = await this.prismaService.socketMember.findMany({
      where: {
        userid,
      },
    });
    const expiredMemberIds: string[] = [];
    sessions.forEach(({ memberid }) => {
      const clientSocket = this.server.sockets.sockets.get(memberid);
      console.log(memberid, clientSocket);
      // 如果没有client说明已经过期，删除memberid
      if (!clientSocket) {
        expiredMemberIds.push(memberid);
        return;
      }
      clientSocket.emit('NewFriendApply', {
        fromid,
        reason,
      });
    });
    this.prismaService.socketMember.deleteMany({
      where: {
        memberid: {
          in: expiredMemberIds,
        },
      },
    });
  }
}
