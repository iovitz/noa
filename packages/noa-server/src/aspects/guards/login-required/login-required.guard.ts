import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import Redis from 'ioredis'
import { REDIS_CLIENT } from 'src/redis/redis.module'
import { SyncManagerService } from 'src/services/sync-manager/sync-manager.service'
import { REQUEST_TRACER } from 'src/services/tracer/tracer.service'
import { CookieKeys } from 'src/shared/constans/cookie'
import { Tracer } from 'src/shared/tracer/tracer'

@Injectable()
export class LoginRequiredGuard implements CanActivate {
  @Inject(REDIS_CLIENT)
  redis: Redis

  @Inject(REQUEST_TRACER)
  tracer: Tracer

  @Inject(SyncManagerService)
  syncManager: SyncManagerService

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
      && (redisResult = await this.syncManager.add(req, 'GET_USER_INFO', this.redis.get(`session-${session}`)))
    ) {
      this.tracer.info('Valid Session', { session })
      const userInfo = JSON.parse(redisResult)
      req.userId = userInfo.id
      return true
    }
    res.cookie(CookieKeys.Session, '', { expires: new Date(0) })
    throw new UnauthorizedException('请重新登录')
  }
}
