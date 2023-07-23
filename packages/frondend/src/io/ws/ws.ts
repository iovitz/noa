import logger from '@/utils/logger'
import { Socket, io } from '@hyoga/uni-socket.io'

interface EventItem {
  event: string
  data: unknown
}

class LongChain {
  private isConnected: boolean = false

  private eventQueue: EventItem[] = []

  connection: Socket
  constructor(private url: string) {
    this.connection = io(this.url, {
      query: {},
      transports: ['websocket', 'polling'],
      timeout: 5000,
    })
    this.init()
  }

  init() {
    this.connection.on('connect', () => {
      const { id } = this.connection

      logger.info('Socket链接成功', id)
      this.isConnected = true
      this.emit('hello', {
        name: 'zs',
      })
    })
    //监听断线
    this.connection.on('error', (msg: any) => {
      logger.info('Socket链接失败', msg)
    })
  }

  on(event: string, callBack: (...args: any[]) => void) {
    this.connection.on(event, callBack)
  }

  off(event: string, callBack: (...args: any[]) => void) {
    this.connection.off(event, callBack)
  }

  emit(event: string, data: unknown) {
    if (!this.isConnected) {
      this.eventQueue.push({
        event,
        data,
      })
    }
    this.eventQueue.forEach(({ event, data }) => {
      this.connection.emit(event, data)
    })
    this.connection.emit(event, data)
  }
}

export const longChain = new LongChain(import.meta.env.VITE_WS_URL)
