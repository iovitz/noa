import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UtilsService } from './utils/utils.service';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [PrismaService, UtilsService],
  exports: [PrismaService, UtilsService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 环境变量配置
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
    }),
    LoggerModule,
  ],
})
export class CommonModule {}
