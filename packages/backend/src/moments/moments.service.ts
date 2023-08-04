import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { PublishMomentDTO } from './moment.dto';

@Injectable()
export class MomentsService {
  constructor(private prismaService: PrismaService) {}

  async createMoment(data: PublishMomentDTO) {
    return this.prismaService.moment.create({
      data: {
        content: data.content,
      },

      select: {},
    });
  }
}
