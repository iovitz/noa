import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import * as cookieParser from 'cookie-parser'
import { BadRequestFilter } from './aspects/filters/bad-request/bad-request.filter'
import { DefaultFilter } from './aspects/filters/default/default.filter'
import { HttpFilter } from './aspects/filters/http/http.filter'
import { ContextInterceptor } from './aspects/interceptors/context/context.interceptor'
import { PreparePromiseInterceptor } from './aspects/interceptors/prepare-promise/prepare-promise.interceptor'
import { ResponseFormatterInterceptor } from './aspects/interceptors/response-formatter/response-formatter.interceptor'
import { InejctUtilsMiddleware } from './aspects/middlewares/inejct-utils/inejct-utils.middleware'
import { FormPageModule } from './form-page/form-page.module'
import { HomeModule } from './home/home.module'
import { PermissionModule } from './permission/permission.module'
import { RedisModule } from './redis/redis.module'
import { SecurityModule } from './security/security.module'
import { SocketV1Module } from './socketv1/socketv1.module'
import { SpaceModule } from './space/space.module'
import { StatusModule } from './status/status.module'
import { UserModule } from './user/user.module'
import { IoService } from './utils/io/io/io.service'
import { UtilModule } from './utils/util.module'

@Module({
  imports: [
    UtilModule,
    EventEmitterModule.forRoot(),
    RedisModule,
    SocketV1Module,
    UserModule,
    SecurityModule,
    StatusModule,
    HomeModule,
    RedisModule,
    PermissionModule,
    SpaceModule,
    FormPageModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatterInterceptor,
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
    IoService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieParser(),
        // middleware中主要用来注入工具函数
        InejctUtilsMiddleware,
      )
      .forRoutes('*')
  }
}
