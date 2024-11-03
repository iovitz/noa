export class PromiseManager {
  private promiseMap = new Map<string, Promise<any>>()

  add(key: string, promise: Promise<any>) {
    this.promiseMap.set(key, promise)
  }

  get(key: string) {
    return this.promiseMap.get(key)
  }
}
