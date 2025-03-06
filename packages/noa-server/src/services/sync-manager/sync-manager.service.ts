import { Injectable } from '@nestjs/common'
import { Tracer } from 'src/shared/tracer/tracer'

class SyncManager {
  private tracer = new Tracer(SyncManager.name)
  private promiseMap = new Map<PromiseKeys, Promise<any>>()

  add<T = unknown>(key: PromiseKeys, promise: Promise<T>) {
    if (this.get(key)) {
      this.tracer.warn('Promise Already Exists', key)
    }
    const newPromise = promise.then((res) => {
      this.tracer.info('Promise Resolved', key)
      return res
    }).catch((err) => {
      this.tracer.error('Promise Rejected', {
        key,
        error: err,
      })
      throw err
    })
    this.promiseMap.set(key, newPromise)
    return newPromise
  }

  get(key: PromiseKeys) {
    return this.promiseMap.get(key)
  }
}

@Injectable()
export class SyncManagerService {
  private requestSyncMap = new WeakMap<Req, SyncManager>()
  private tracer = new Tracer(SyncManagerService.name)

  get(req: Req, key: PromiseKeys) {
    const requestMap = this.requestSyncMap.get(req) || new SyncManager()
    this.requestSyncMap.set(req, requestMap)
    const promise = requestMap.get(key)
    if (!promise) {
      this.tracer.warn('Promise Not Fount', key)
    }
    return promise
  }

  add<T>(req: Req, key: PromiseKeys, promise: Promise<T>): Promise<T> {
    const requestMap = this.requestSyncMap.get(req) || new SyncManager()
    this.requestSyncMap.set(req, requestMap)
    return requestMap.add(key, promise)
  }
}

type PromiseKeys = 'GET_USER_INFO' | 'GET_FILE' | 'GET_PAGE_PERMISSION'
