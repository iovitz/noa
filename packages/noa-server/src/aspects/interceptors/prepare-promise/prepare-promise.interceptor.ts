import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import Redis from 'ioredis'
import { Observable } from 'rxjs'
import { REDIS_CLIENT } from 'src/redis/redis.module'
import { CookieKeys } from 'src/shared/constans/cookie'

@Injectable()
export class PreparePromiseInterceptor implements NestInterceptor {
  @Inject(REDIS_CLIENT)
  redis: Redis

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 获取UserID
    const req = context.switchToHttp().getRequest<Req>()
    const session = req.getCookie(CookieKeys.Session)
    if (session) {
      req.promiseManager.add('GET_USER_INFO', this.redis.get(`-${session}`).then((v) => {
        req.tracer.log('Get User Info Promise', undefined)
        if (v) {
          const userInfo = JSON.parse(v)
          req.userId = userInfo.userId
        }
        else {
          req.tracer.log(`Invalid Session : ${session}`)
        }
      }))
    }
    else {
      req.tracer.log('Request Without Session')
    }

    return next.handle()
  }
}
