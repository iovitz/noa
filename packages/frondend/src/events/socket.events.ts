import { longChain } from '@/io/ws/ws'
import { useApplyStore } from '@/store'
import logger from '@/utils/logger'

class SocketEventManager {
  bind() {
    useApplyStore().bindEvent()
    logger.verbose('SocketEventManager绑定事件成功')
  }
  unbind() {
    useApplyStore().unbindEvent()
    logger.verbose('SocketEventManager取消绑定事件')
  }
}

export const socketEventManager = new SocketEventManager()
