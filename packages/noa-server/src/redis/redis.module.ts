import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

export const REDIS_CLIENT = Symbol('REDIS_CLIENT')

@Module({
  providers: [{
    provide: REDIS_CLIENT,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const redis = new Redis(configService.get('REDIS_CONNECT_URL'))
      await redis.ping() // ping 方法用于测试连接是否正常
      return redis
    },
  }],
  exports: [REDIS_CLIENT],
})
export class RedisModule {
}
