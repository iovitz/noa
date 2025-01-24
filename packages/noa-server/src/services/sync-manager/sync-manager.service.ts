import { Provider, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { SyncManager } from './sync-manager'

export const SYNC_MANAGER = Symbol('SYNC_MANAGER')

export const SyncManagerProvider: Provider = {
  provide: SYNC_MANAGER,
  scope: Scope.REQUEST, // 确保每个请求都会生成一个新的实例
  inject: [REQUEST],
  useFactory: (req: Req) => {
    if (!req.syncManager) {
      req.syncManager = new SyncManager()
    }
    return req.tracer
  },
}
