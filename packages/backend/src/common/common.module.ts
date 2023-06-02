import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UtilsService } from './utils/utils.service';

@Global()
@Module({
  providers: [PrismaService, UtilsService],
  exports: [PrismaService, UtilsService],
})
export class CommonModule {}
