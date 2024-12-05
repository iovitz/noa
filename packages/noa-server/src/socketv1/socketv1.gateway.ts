import {
  OnGatewayConnection,
  OnGatewayDisconnect,

  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { TracerService } from 'src/util/tracer/tracer.service'

@WebSocketGateway({
  path: '/api-noa/ws',
})
export class SocketV1Gateway
implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
  constructor(private readonly log: TracerService) {}

  @WebSocketServer() server: Server
  users = 0

  async handleConnection(client: Socket) {
    // 鉴权
    this.log.log('Socket Connect', { id: client.id })
  }

  async handleDisconnect(client: Socket) {
    this.log.log('Socket disconnect', { id: client.id })
  }

  @SubscribeMessage('events')
  async handleEvent(client: Socket, data: string) {
    return data
  }

  /**
   * 服务端收到了前端产生的CS
   */
  @SubscribeMessage('NEW_CHANGES')
  async handleMessage(client: Socket, payload: string) {
    this.log.log('socket hello', {
      payload,
    })

    client.emit('hello', 'server hello payload')
  }
}
