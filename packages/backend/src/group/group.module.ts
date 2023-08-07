import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 权限验证中间件
    consumer.apply(AuthMiddleware).forRoutes(GroupController);
  }
}
