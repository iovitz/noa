import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      const res = await this.$connect();
      Logger.log('数据库链接成功', res);
    } catch (e) {
      Logger.error('数据库链接失败', e);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      Logger.log('关闭数据库');
      await app.close();
    });
  }
}
