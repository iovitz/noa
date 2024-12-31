type PromiseKeys = 'GET_USER_INFO' | 'GET_FILE' | 'GET_PAGE_PERMISSION'
export class PromiseManager {
  private promiseMap = new Map<PromiseKeys, Promise<any>>()

  add<T = unknown>(key: PromiseKeys, promise: Promise<T>) {
    this.promiseMap.set(key, promise)
    return promise
  }

  get(key: PromiseKeys) {
    return this.promiseMap.get(key)
  }
}
