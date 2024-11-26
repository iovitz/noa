type PromiseKeys = 'GET_USER_INFO'
export class PromiseManager {
  private promiseMap = new Map<PromiseKeys, Promise<any>>()

  add(key: PromiseKeys, promise: Promise<any>) {
    this.promiseMap.set(key, promise)
    return promise
  }

  get(key: PromiseKeys) {
    return this.promiseMap.get(key)
  }
}
