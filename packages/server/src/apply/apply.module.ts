import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApplyController } from './apply.controller';
import { ApplyService } from './apply.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  controllers: [ApplyController],
  providers: [ApplyService],
})
export class ApplyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 权限验证中间件
    consumer.apply(AuthMiddleware).forRoutes(ApplyController);
  }
}
