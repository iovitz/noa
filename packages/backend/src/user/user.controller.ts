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
import { UserParamsDTO, ModifyUserDTO, SearchUserDTO } from './user.dto';

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

  @Get('/u/:userid')
  async getUser(
    @Param() { userid }: UserParamsDTO,
    @Request() req: ExpressRequest,
  ) {
    return await this.prismaService.user.findFirst({
      where: {
        userid,
        NOT: {
          userid,
        },
      },
      select: {
        userid: true,
        avatar: true,
        nickname: true,
      },
    });
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
}
