import { PageIO } from '../io'
import { ChangeSetEvent, EngineContext, EngineParams } from './engine.types'

export class Engine {
  io: PageIO

  constructor(private context: EngineContext, params: EngineParams) {
    this.io = params.io
  }

  async start() {
    await this.fetchPageData()
    this.watch()
  }

  stop() {
    this.unwatch()
  }

  get pageId() {
    return this.context.id
  }

  async fetchPageData() {
    const { data } = await this.io.request({
      method: 'post',
      data: {
        id: this.pageId,
      },
    })
    return data
  }

  watch() {
    this.io.on(this.pageId, this.handleMessage)
  }

  unwatch() {
    this.io.off(this.pageId, this.handleMessage)
  }

  /**
   * 处理服务端发送的协同数据
   */
  handleMessage({ type, data }: ChangeSetEvent) {
    console.error(type, data)
  }
}
