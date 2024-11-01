import type { Socket } from 'socket.io-client'
import SocketClient from 'socket.io-client'

// Socket V2文档：https://socket.io/zh-CN/docs/v2/client-initialization/
export class FeSocket {
  isConnected = false

  eventQueue = []

  private connection!: Socket

  get memberId() {
    return this.connection.id ?? null
  }

  init() {
    this.connection = SocketClient('/', {
      path: '/ws/socket.io',
      transports: ['polling', 'websocket', 'webtransport'],
    })
    this.initEvents()
    return this
  }

  initEvents() {
    this.connection.on('connect', () => {
      if (!this.connection)
        return

      this.isConnected = true
    })

    // 连接出错
    this.connection.on('connect_error', (error) => {
      console.error('Socket连接失败', error)
      this.isConnected = false
    })

    // 断线
    this.connection.on('disconnect', (msg) => {
      console.error('Socket断开连接', msg)
      this.isConnected = false
    })
  }

  connect() {
    this.connection.connect()
  }

  disconnect() {
    this.connection.disconnect()
  }
}

export const ws = new FeSocket()
