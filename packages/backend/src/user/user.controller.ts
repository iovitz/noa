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
import { LoginDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginDTO) {
    const { username, password } = body;
    const user = await this.prismaService.user.findFirst({
      where: {
        username,
      },
      select: {
        nickname: true,
        username: true,
        password: true,
        email: true,
      },
    });

    if (user) {
      const res = await this.userService.comparePassword(
        password,
        user.password,
      );
      if (res) {
        return {
          email: user.email,
          username: user.username,
          nickname: user.nickname,
        };
      }
    }

    throw new HttpException('账号或密码错误', HttpStatus.BAD_REQUEST);
  }

  @Post('/register')
  async register(
    @Body() body: { nickname: string; username: string; password: string },
  ) {
    const { nickname, username, password } = body;
    const existsUser = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });

    if (existsUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
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

    this.prismaService.$transaction([
      this.prismaService.user.create({
        data: {
          userId: uid,
          nickname,
          username,
          password: await this.userService.encryptPassword(password),
        },
      }),
      this.prismaService.userProfile.create({
        data: {
          uid,
        },
      }),
    ]);

    return 'hello';
  }
}
