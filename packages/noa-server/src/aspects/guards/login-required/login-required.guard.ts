import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import Redis from 'ioredis'
import { REDIS_CLIENT } from 'src/redis/redis.module'
import { CookieKeys } from 'src/shared/constans/cookie'

@Injectable()
export class LoginRequiredGuard implements CanActivate {
  @Inject(REDIS_CLIENT)
  redis: Redis

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // 获取UserID
    const http = context.switchToHttp()
    const req = http.getRequest<Req>()
    const res = http.getResponse<Res>()
    const session = req.getCookie(CookieKeys.Session)
    let redisResult: string
    if (
      session
      // eslint-disable-next-line no-cond-assign
      && (redisResult = await req.promiseManager.add('GET_USER_INFO', this.redis.get(`session-${session}`)))
    ) {
      req.tracer.log('Valid Session', { session })
      const userInfo = JSON.parse(redisResult)
      req.userId = userInfo.id
      return true
    }
    req.tracer.log('Request Without Session')
    res.cookie(CookieKeys.Session, '', { expires: new Date(0) })
    return false
  }
}
