import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 权限验证中间件
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
