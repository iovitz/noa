import {
  OnGatewayConnection,
  OnGatewayDisconnect,

  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { TracerService } from 'src/services/tracer/tracer.service'

@WebSocketGateway({
  path: '/socket/v1',
})
export class SocketV1Gateway
implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
  constructor(private readonly log: TracerService) {}

  @WebSocketServer() server: Server
  users = 0

  async handleConnection(client: Socket) {
    this.log.log('开始连接', { id: client.id })
  }

  async handleDisconnect(client: Socket) {
    this.log.log('取消连接', { id: client.id })
  }

  @SubscribeMessage('events')
  async handleEvent(client: Socket, data: string) {
    return data
  }

  @SubscribeMessage('hello')
  async handleMessage(client: Socket, payload: string) {
    this.log.log('socket hello', {
      payload,
    })

    client.emit('hello', 'server hello payload')
  }
}
