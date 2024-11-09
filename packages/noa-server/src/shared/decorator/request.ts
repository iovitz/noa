import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { CookieKeys } from '../constans/cookie'

// 拿到请求Tracer
export const Tracer = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Req>()
    return req.tracer
  },
)

// 获取用户IP
export const ClientIP = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Req>()
    return req.ip.match(/\d+\.\d+\.\d+\.\d+/)?.[0]
  },
)

// 获取用户IP
export const ClientID = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Req>()
    return req.clientId
  },
)

// 获取指定Cookie
export const Cookie = createParamDecorator(
  (cookieKey: CookieKeys, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Req>()
    return req.getCookie(cookieKey)
  },
)
