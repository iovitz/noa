import { homedir } from 'node:os'
import { join } from 'node:path'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmLogger } from 'src/shared/tracer/typeorm.tracer'
import { EncryptService } from './encrypt/encrypt.service'
import { HttpService } from './http/http.service'
import { IoService } from './io/io/io.service'
import { SyncManagerService } from './sync-manager/sync-manager.service'
import { RequestTracerProvider } from './tracer/tracer.service'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
      // 开发环境才加载配置数据
      ['production'].includes(process.env.NODE_ENV) ? [] : ['.env.development'],
      load: [
        // 可以加载远程配置
        async () => {
          const env = process.env
          const isProd = env.NODE_ENV === 'production'

          return {
            isProd,
            REDIS_CONNECT_URL: env.REDIS_CONNECT_URL,
          }
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        // 放到主页目录下
        const sqliteFilePath = join(homedir(), 'sqlite/noa.sqlite')

        return {
          type: 'better-sqlite3',
          database: sqliteFilePath,
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
          logger: typeOrmLogger,
        }
      },
    }),
  ],
  // 全局使用的一些Service
  providers: [EncryptService, RequestTracerProvider, HttpService, IoService, SyncManagerService],
  exports: [EncryptService, RequestTracerProvider, HttpService, IoService, SyncManagerService],
})
export class UtilModule {}
