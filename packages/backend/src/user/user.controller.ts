import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/global/prisma/prisma.service';
import {
  UserParamsDTO,
  ModifyUserDTO,
  SearchUserDTO,
  FetchUserInfoDTO,
} from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post('/search')
  async searchUser(
    @Body() { contains, page = 1, take = 10 }: SearchUserDTO,
    @Request() req: ExpressRequest,
  ) {
    if (!contains) return [];
    return await this.userService.findUsers(
      {
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
        NOT: {
          userid: req.userid,
        },
      },
      page,
      take,
    );
  }

  @Post('/info')
  async fetchUserInfo(@Body() { userids, profile }: FetchUserInfoDTO) {
    if (!userids.length) return [];
    const res = await this.prismaService.user.findMany({
      where: {
        userid: {
          in: userids,
        },
      },
      select: {
        userid: true,
        avatar: true,
        nickname: true,
        profile: profile && {
          select: {
            gender: true,
            birth: true,
            desc: true,
          },
        },
      },
    });
    return res.reduce((prev, { userid, nickname, avatar, profile }) => {
      prev[userid] = {
        nickname,
        avatar,
        profile,
      };
      return prev;
    }, {});
  }

  @Put('/u/:userid')
  async modifyUser(
    @Param() { userid }: UserParamsDTO,
    @Body() { avatar }: ModifyUserDTO,
  ) {
    if (!avatar) {
      return;
    }
    const userInfo = await this.prismaService.user.update({
      where: {
        userid,
      },
      data: {
        avatar,
      },
      select: {
        userid: true,
        avatar: true,
        nickname: true,
      },
    });
    return userInfo;
  }

  @Get('/fullinfo')
  async getFullInfo(@Request() { userid }: ExpressRequest) {
    return await this.prismaService.user.findFirst({
      where: {
        userid,
      },
      select: {
        userid: true,
        profile: true,
        nickname: true,
        avatar: true,
        request: true,
        friends: {
          select: {
            friend: {
              select: {
                userid: true,
              },
            },
          },
        },
      },
    });
  }
}
