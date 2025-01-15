import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import RedisMock from 'ioredis-mock'
import { TracerService } from 'src/util/tracer/tracer.service'

export const REDIS_CLIENT = Symbol('REDIS_CLIENT')

@Global()
@Module({
  providers: [TracerService, {
    provide: REDIS_CLIENT,
    inject: [ConfigService, TracerService],
    useFactory: async (configService: ConfigService, tracerService: TracerService) => {
      const redis = configService.get('isProd') ? new Redis(configService.get('REDIS_CONNECT_URL')) : new RedisMock()
      await redis.ping() // ping 方法用于测试连接是否正常
      tracerService.log('Redis Ready')
      return redis
    },
  }],
  exports: [REDIS_CLIENT],
})
export class RedisModule {
}
