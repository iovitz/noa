import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaServiceBase } from './PrismaClient';

@Injectable()
export class PrismaService extends PrismaServiceBase {
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
