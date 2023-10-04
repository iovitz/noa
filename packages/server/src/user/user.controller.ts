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
  async fetchUserInfo(
    @Body() { userids, profile, isFriend }: FetchUserInfoDTO,
    @Request() req: ExpressRequest,
  ) {
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
          },
        },
      },
    });

    const friends: Record<string, true> = {};

    if (isFriend) {
      console.log(req.userid, userids);
      const friendItems = await this.prismaService.friend.findMany({
        where: {
          userid: req.userid,
          friendid: {
            in: userids,
          },
        },
      });
      console.log(friendItems);
      friendItems.forEach((item) => {
        friends[item.friendid] = true;
      });
    }
    return res.reduce((prev, { userid, nickname, avatar, profile }) => {
      prev[userid] = {
        nickname,
        avatar,
        profile,
      };
      if (isFriend) {
        prev[userid].isFriend = friends[userid] ?? false;
      }
      return prev;
    }, {});
  }

  @Put('/info/:userid')
  async modifyUserInfo(
    @Param() { userid }: UserParamsDTO,
    @Body() { avatar, desc, nickname }: ModifyUserDTO,
  ) {
    const userInfo = await this.prismaService.user.update({
      where: {
        userid,
      },
      data: {
        avatar,
        desc,
        nickname,
      },
      select: {
        userid: true,
        avatar: true,
        desc: true,
        
        nickname: true,
      },
    });
    return userInfo;
  }

  @Get('/friends')
  async getFullInfo(@Request() { userid }: ExpressRequest) {
    return (
      (await this.prismaService.friend.findFirst({
        where: {
          userid,
        },
        select: {
          friendid: true,
        },
      })) ?? []
    );
  }
}
