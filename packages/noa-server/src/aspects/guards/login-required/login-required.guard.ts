import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import Redis from 'ioredis'
import { Observable } from 'rxjs'
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
    const req = context.switchToHttp().getRequest<Req>()
    const session = req.getCookie(CookieKeys.Session)
    if (session) {
      await req.promiseManager.add('GET_USER_INFO', this.redis.get(`session-${session}`).then((v) => {
        req.tracer.log('Get User Info Promise', undefined)
        if (v) {
          const userInfo = JSON.parse(v)
          req.userId = userInfo.id
        }
        else {
          req.tracer.log('Invalid Session', { session })
          throw new UnauthorizedException()
        }
      }))
    }
    else {
      req.tracer.log('Request Without Session')
      throw new UnauthorizedException()
    }

    return true
  }
}
