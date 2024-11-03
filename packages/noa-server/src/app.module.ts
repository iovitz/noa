import * as process from 'node:process'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { DefaultFilter } from './aspects/filters/default/default.filter'
import { HttpFilter } from './aspects/filters/http/http.filter'
import { LogInterceptor } from './aspects/interceptors/log/log.interceptor'
import { PreparePromiseInterceptor } from './aspects/interceptors/prepare-promise/prepare-promise.interceptor'
import { ResponseFormatterInterceptor } from './aspects/interceptors/response-formatter/response-formatter.interceptor'
import { InjectorMiddleware } from './aspects/middlewares/injector/injector.middleware'
import { DbModule } from './db/db.module'
import { GlobalModule } from './global/global.module'
import { TracerService } from './global/tracer/tracer.service'
import { HomeModule } from './home/home.module'
import { SocketV1Module } from './socketv1/socketv1.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env', // 默认配置文件
        // 选择配置类型
        ['prod', 'pre'].includes(process.env.APP_NAME_NODE_ENV)
          ? '.env.prod'
          : '.env.dev', // 环境配置文件
      ],
      load: [
        // 可以加载远程配置
        async () => {
          const isProd = process.env.NODE_ENV === 'prod'

          return {
            isProd,
          }
        },
      ],
    }),
    GlobalModule,
    EventEmitterModule.forRoot(),
    DbModule,
    SocketV1Module,
    UserModule,
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
