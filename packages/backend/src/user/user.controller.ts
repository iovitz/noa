import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Param,
  Put,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UserParamsDTO, ModifyUserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get('/:userid')
  async getUser(@Param() { userid }: UserParamsDTO) {
    // const userInfo = await this.userService.findUser({ userid });
    // return userInfo;
    return '';
  }

  @Put('/:userid')
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
