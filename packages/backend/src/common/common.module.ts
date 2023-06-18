import { Global, Logger, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UtilsService } from './utils/utils.service';

@Global()
@Module({
  providers: [PrismaService, UtilsService, Logger],
  exports: [PrismaService, UtilsService, Logger],
})
export class CommonModule {}
