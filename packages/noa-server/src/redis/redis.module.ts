import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import { Tracer } from 'src/utils/tracer/tracer.service'

export const REDIS_CLIENT = Symbol('REDIS_CLIENT')

@Global()
@Module({
  providers: [{
    provide: REDIS_CLIENT,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const tracer = new Tracer(RedisModule.name)
      const redis = new Redis({
        host: configService.getOrThrow('REDIS_HOST'),
        password: configService.get('REDIS_PASS'),
      })
      await redis.ping() // ping 方法用于测试连接是否正常
      tracer.log('Redis Ready')
      return redis
    },
  }],
  exports: [REDIS_CLIENT],
})
export class RedisModule {
}
