import { Global, Module } from '@nestjs/common';
import { UtilsService } from './utils/utils.service';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './typeorm/typeorm.module';

@Global()
@Module({
  providers: [UtilsService],
  exports: [UtilsService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 环境变量配置
      // .env文件中的属性，会默认覆盖所有环境单独配置的属性
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    LoggerModule,
    TypeOrmModule,
  ],
})
export class CommonModule {}
