import { Request, Response } from 'express'
import { TracerService } from './services/tracer/tracer.service'
import { PromiseManager } from './shared/utils/promise-manager'

declare global {
  interface MiddlewareInjected {
    // 中间注入的对象，不一定真的存在，注意调用时间
    stime: bigint
    clientId: string
    promiseManager: PromiseManager
    tracer: TracerService
    getCostNs: () => string
    getCookie: (key: CookieKeys) => string | undefined
    setCookie: (key: CookieKeys, value: string) => void
  }
  interface Req extends Request, MiddlewareInjected {
    user?: any
    userId?: string
  }
  interface Res extends Response, MiddlewareInjected {}

  // 往原始类型上增加类型
  namespace Express {
    export interface Request {}
    export interface Response {}
  }
}

declare module 'express-session' {
  interface SessionData {
    userId: string
  }
}
