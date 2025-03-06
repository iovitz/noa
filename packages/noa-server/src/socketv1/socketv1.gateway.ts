import {
  OnGatewayConnection,
  OnGatewayDisconnect,

  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Tracer } from 'src/shared/tracer/tracer'

@WebSocketGateway({
  path: '/api-noa/ws',
})
export class SocketV1Gateway
implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
  private tracer = new Tracer(SocketV1Gateway.name)

  @WebSocketServer() server: Server
  users = 0

  async handleConnection(client: Socket) {
    // 鉴权
    this.tracer.info('Socket Connect', { id: client.id })
    client.onAny(this.handleAnyEvent)
  }

  async handleDisconnect(client: Socket) {
    this.tracer.info('Socket disconnect', { id: client.id })
  }

  handleAnyEvent = (event: string, ...args: any[]) => {
    this.tracer.info(`got event ${event}`, { args })
  }

  @SubscribeMessage('events')
  async handleEvent(client: Socket, data: string) {
    this.tracer.info('###', data)
    return data
  }

  /**
   * 服务端收到了前端产生的CS
   */
  @SubscribeMessage('NEW_CHANGES')
  async handleMessage(client: Socket, payload: string) {
    this.tracer.info('socket hello', {
      payload,
    })

    client.emit('hello', 'server hello payload')
  }
}
