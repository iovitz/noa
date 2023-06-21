import { UserService } from './user.service';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
  Post,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post('/login')
  async login(@Body() body: { username?: string; password?: string }) {
    this.userService.zUsername.parse(body.username);
    this.userService.zPassword.parse(body.password);

    return 'hello';
  }

  @Post('/register')
  async register(
    @Body() body: { nickname: string; username: string; password: string },
  ) {
    const { nickname, username, password } = body;
    this.userService.zNickname.parse(nickname);
    this.userService.zUsername.parse(username);
    this.userService.zPassword.parse(password);

    const existsUser = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });

    if (existsUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const getUserId = async () => {
      const uid = this.userService.genNumberString(10);
      const existsUser = await this.prismaService.user.findFirst({
        where: {
          userId: uid,
        },
      });
      if (existsUser) return await getUserId();
      return uid;
    };

    const uid = await getUserId();
    this.logger.log({
      uid,
    });

    const res = await this.prismaService.user.create({
      data: {
        userId: uid,
        nickname,
        username,
        password,
      },
    });

    this.logger.verbose(res);
    return 'hello';
  }
}
