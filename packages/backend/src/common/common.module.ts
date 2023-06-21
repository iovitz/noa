import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UtilsService } from './utils/utils.service';
import { LoggerModule } from './logger/logger.module';

@Global()
@Module({
  providers: [PrismaService, UtilsService],
  exports: [PrismaService, UtilsService],
  imports: [LoggerModule],
})
export class CommonModule {}
