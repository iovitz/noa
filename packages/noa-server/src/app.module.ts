import { homedir } from 'node:os'
import { join } from 'node:path'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { DefaultFilter } from './aspects/filters/default/default.filter'
import { HttpFilter } from './aspects/filters/http/http.filter'
import { LogInterceptor } from './aspects/interceptors/log/log.interceptor'
import { PreparePromiseInterceptor } from './aspects/interceptors/prepare-promise/prepare-promise.interceptor'
import { ResponseFormatterInterceptor } from './aspects/interceptors/response-formatter/response-formatter.interceptor'
import { InjectorMiddleware } from './aspects/middlewares/injector/injector.middleware'
import { GlobalModule } from './global/global.module'
import { TracerService } from './global/tracer/tracer.service'
import { HomeModule } from './home/home.module'
import { SecurityModule } from './security/security.module'
import { SocketV1Module } from './socketv1/socketv1.module'
import { StatusModule } from './status/status.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (_configService: ConfigService) => {
        const sqliteFilePath = join(homedir(), 'sqlite/noa.sqlite')
        return {
          type: 'better-sqlite3',
          database: sqliteFilePath,
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        }
      },
    }),
    EventEmitterModule.forRoot(),
    SocketV1Module,
    UserModule,
    SecurityModule,
    StatusModule,
    HomeModule,
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
        session({
          secret: this.config.getOrThrow('SESSION_SECRET'),
          resave: false,
          saveUninitialized: false,
        }),
        // middleware中主要用来注入工具函数
        InjectorMiddleware,
      )
      .forRoutes('*')
  }
}
