import { Global, Module, OnModuleInit } from '@nestjs/common'
import Redis from 'ioredis'
import { ConfigService } from 'src/services/config/config.service'
import { Tracer } from 'src/services/tracer/tracer.service'

export const REDIS_CLIENT = Symbol('REDIS_CLIENT')

@Global()
@Module({
  providers: [{
    provide: REDIS_CLIENT,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const tracer = new Tracer(RedisModule.name)
      const redis = new Redis({
        host: configService.get('REDIS_HOST'),
        password: configService.get('REDIS_PASS'),
        maxRetriesPerRequest: 3,
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
