import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/common.module';
import { LogModule } from './log/log.module';
import { WsModule } from './ws/ws.module';
import { MomentsModule } from './moments/moments.module';
import { GroupModule } from './group/group.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GlobalModule,
    WsModule,
    LogModule,
    UserModule,
    GroupModule,
    MomentsModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 权限验证中间件
    consumer
      .apply(AuthMiddleware)
      .forRoutes(UserModule, GroupModule, MomentsModule);
  }
}
