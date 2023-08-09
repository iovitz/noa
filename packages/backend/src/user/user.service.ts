import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UtilsService } from 'src/global/utils/utils.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async findUser(contains: string) {
    return this.prismaService.user.findMany({
      where: {
        OR: [
          {
            userid: {
              contains,
            },
          },
          {
            nickname: {
              contains,
            },
          },
        ],
      },
      select: {
        nickname: true,
        userid: true,
        avatar: true,
      },
    });
  }
}
