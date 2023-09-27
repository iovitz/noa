import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MomentsController } from './moments.controller';
import { MomentsService } from './moments.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  controllers: [MomentsController],
  providers: [MomentsService],
})
export class MomentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 权限验证中间件
    consumer.apply(AuthMiddleware).forRoutes(MomentsController);
  }
}
