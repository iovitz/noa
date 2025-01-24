import {
  OnGatewayConnection,
  OnGatewayDisconnect,

  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Tracer } from 'src/services/tracer/tracer.service'

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
    this.tracer.log('Socket Connect', { id: client.id })
  }

  async handleDisconnect(client: Socket) {
    this.tracer.log('Socket disconnect', { id: client.id })
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
    this.tracer.log('socket hello', {
      payload,
    })

    client.emit('hello', 'server hello payload')
  }
}
