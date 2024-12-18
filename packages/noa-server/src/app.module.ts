import { homedir } from 'node:os'
import { join } from 'node:path'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as cookieParser from 'cookie-parser'
import { Logger } from 'typeorm'
import { BadRequestFilter } from './aspects/filters/bad-request/bad-request.filter'
import { DefaultFilter } from './aspects/filters/default/default.filter'
import { HttpFilter } from './aspects/filters/http/http.filter'
import { LogInterceptor } from './aspects/interceptors/log/log.interceptor'
import { PreparePromiseInterceptor } from './aspects/interceptors/prepare-promise/prepare-promise.interceptor'
import { ResponseFormatterInterceptor } from './aspects/interceptors/response-formatter/response-formatter.interceptor'
import { InejctUtilsMiddleware } from './aspects/middlewares/inejct-utils/inejct-utils.middleware'
import { HomeModule } from './home/home.module'
import { PageModule } from './page/page.module'
import { RedisModule } from './redis/redis.module'
import { SecurityModule } from './security/security.module'
import { SocketV1Module } from './socketv1/socketv1.module'
import { StatusModule } from './status/status.module'
import { UserModule } from './user/user.module'
import { TracerService } from './util/tracer/tracer.service'
import { UtilModule } from './util/util.module'

@Module({
  imports: [
    UtilModule,
    TypeOrmModule.forRootAsync({
      inject: [TracerService],
      useFactory: async (tracerService: TracerService) => {
        // 放到主页目录下
        const sqliteFilePath = join(homedir(), 'sqlite/noa.sqlite')
        const typeormTracer = tracerService.child('typeorm')
        const typeOrmLogger: Logger = {
          logQuery(query: string) {
            typeormTracer.debug(query)
          },
          logQueryError(error: string | Error, query: string) {
            typeormTracer.error(query, error)
          },
          logQuerySlow(time: number, query: string) {
            typeormTracer.log('Query Slow', { time, query })
          },
          logSchemaBuild(message: string) {
            typeormTracer.debug(`Schema Build: ${message}`)
          },
          logMigration(message: string) {
            typeormTracer.debug(`Schema Build: ${message}`)
          },
          log(level: 'log' | 'info' | 'warn', message: any) {
            typeormTracer.debug('LOG', message)
          },
        }
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
    EventEmitterModule.forRoot(),
    RedisModule,
    SocketV1Module,
    UserModule,
    SecurityModule,
    StatusModule,
    HomeModule,
    RedisModule,
    PageModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatterInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PreparePromiseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: DefaultFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestFilter,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(
    private config: ConfigService,
    private tracer: TracerService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    this.tracer.log('Initial middlewares')
    consumer
      .apply(
        cookieParser(),
        // middleware中主要用来注入工具函数
        InejctUtilsMiddleware,
      )
      .forRoutes('*')
  }
}
