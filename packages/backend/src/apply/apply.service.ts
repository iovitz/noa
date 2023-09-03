import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UtilsService } from 'src/global/utils/utils.service';

@Injectable()
export class ApplyService {
  constructor(
    private prismaService: PrismaService,
    private utilsService: UtilsService,
  ) {}
}
