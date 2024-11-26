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

@Injectable()
export class PreparePromiseInterceptor implements NestInterceptor {
  @Inject(REDIS_CLIENT)
  redis: Redis

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
  }
}
