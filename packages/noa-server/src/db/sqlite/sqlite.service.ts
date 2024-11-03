import {

  Injectable,
  Logger,

  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/sqlite'

@Injectable()
export class SqliteService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown {
  async onModuleInit() {
    try {
      const res = await this.$connect()
      Logger.log('数据库链接成功', res)
    }
    catch (e) {
      Logger.error('数据库链接失败', e)
    }
  }

  async onApplicationShutdown() {
    this.$disconnect()
  }
}
