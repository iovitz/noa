import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UtilsService } from 'src/global/utils/utils.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async findUsers(where: Prisma.UserWhereInput, page: number, take: number) {
    return this.prismaService.user.findMany({
      where: where,
      select: {
        userid: true,
        avatar: true,
        nickname: true,
      },
      skip: (page - 1) * take,
      take,
    });
  }

  findUser(userid: string) {
    return this.prismaService.user.findFirst({
      where: {
        userid,
      },
    });
  }
}
