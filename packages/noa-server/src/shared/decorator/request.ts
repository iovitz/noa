import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// 拿到请求Tracer
export const Tracer = createParamDecorator(
  (_data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Req>()
    return req.tracer
  },
)

// 获取用户IP
export const ClientIP = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Req>()
    return req.ip.match(/\d+\.\d+\.\d+\.\d+/)?.[0]
  },
)
