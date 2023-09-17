import { EventName } from '@/events/events'
import logger from '@/utils/logger'
import { storage } from '@/utils/storage'
import { Socket, io } from '@hyoga/uni-socket.io'

interface EventItem {
  event: string
  data: unknown
}

class LongChain {
  private isConnected: boolean = false

  private eventQueue: EventItem[] = []

  connection: Socket

  constructor(private url: string, private path: string) {
    this.connection = io(url, {
      path: path,
      query: {
        session: storage.get('session'),
      },
      transports: ['websocket', 'polling'],
      timeout: 5000,
      // 取消自动连接
      autoConnect: false,
    })
    this.connection.on('connect', () => {
      if (!this.connection) return

      const { id } = this.connection

      logger.info('Socket链接成功', id)
      uni.$emit(EventName.SocketConnected, id)
      this.isConnected = true
      this.emit('hello', {
        name: 'zs',
      })
    })
    //监听断线
    this.connection.on('connect_error', (error: any) => {
      this.isConnected = false
    })

    //监听断线
    this.connection.on('disconnect', (msg: any) => {
      logger.info('Socket断开连接', msg)
      uni.$emit(EventName.SocketDisconnect)
      this.isConnected = false
    })
    //监听断线
    this.connection.onAny((eventName: string, payload: unknown) => {
      uni.$emit(`SOCKET@${eventName}`, payload)
    })
  }

  connect() {
    this.connection.connect()
  }

  on(event: string, callBack: (...args: any[]) => void) {
    this.connection.on(event, callBack)
  }

  off(event: string, callBack: (...args: any[]) => void) {
    this.connection?.off(event, callBack)
  }

  emit(event: string, data: unknown) {
    const { connection } = this
    if (!this.isConnected || !connection) {
      this.eventQueue.push({
        event,
        data,
      })
      return
    }
    this.eventQueue.forEach(({ event, data }) => {
      connection.emit(event, data)
    })
    connection.emit(event, data)
  }
}

export const longChain = new LongChain(import.meta.env.VITE_WS_URL, import.meta.env.VITE_WS_PATH)
