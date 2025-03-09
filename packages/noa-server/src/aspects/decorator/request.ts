import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { CookieKeys } from '../../shared/constans/cookie'

// 获取用户IP
export const ClientIP = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Req>()
    const clientIp = req.header('x-forward-for') ?? req.ip
    if (!clientIp) {
      return '0.0.0.0'
    }
    return clientIp.match(/\d+\.\d+\.\d+\.\d+/)?.[0]
  },
)

// 获取用户IP
export const RequestUser = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Req>()
    return req.userId
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
