import { Provider, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Tracer } from '../../shared/tracer/tracer'

export const REQUEST_TRACER = Symbol('REQUEST_TRACER')

export const RequestTracerProvider: Provider = {
  provide: REQUEST_TRACER,
  scope: Scope.REQUEST, // 确保每个请求都会生成一个新的实例
  inject: [REQUEST],
  useFactory: (req: Req) => {
    if (!req.tracer) {
      req.tracer = new Tracer(req.tracerId ? `Tracer-${req.tracerId}` : 'TRACER_ID')
    }
    return req.tracer
  },
}
