import { MiddlewareConsumer, Module } from '@nestjs/common';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  providers: [OssService],
  controllers: [OssController],
})
export class OssModule {
  configure(consumer: MiddlewareConsumer) {
    // 权限验证中间件
    consumer.apply(AuthMiddleware).forRoutes(OssController);
  }
}
