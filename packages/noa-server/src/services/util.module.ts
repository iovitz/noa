import { homedir } from 'node:os'
import { join } from 'node:path'
import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmLogger } from 'src/shared/tracer/typeorm.tracer'
import { ConfigService } from './config/config.service'
import { EncryptService } from './encrypt/encrypt.service'
import { HttpService } from './http/http.service'
import { IoService } from './io/io/io.service'
import { SyncManagerService } from './sync-manager/sync-manager.service'
import { RequestTracerProvider } from './tracer/tracer.service'

@Global()
@Module({
  imports: [
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
  providers: [EncryptService, RequestTracerProvider, HttpService, IoService, SyncManagerService, ConfigService],
  exports: [EncryptService, RequestTracerProvider, HttpService, IoService, SyncManagerService, ConfigService],
})
export class UtilModule {}
