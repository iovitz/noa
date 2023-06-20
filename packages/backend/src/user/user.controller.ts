import { UserService } from './user.service';
import {
  Body,
  Controller,
  Inject,
  Logger,
  LoggerService,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
    @Inject(Logger) private readonly logger: LoggerService,
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
    this.logger.error('Hello, word', {
      name: 'zs',
    });
    const { nickname, username, password } = body;
    this.userService.zNickname.parse(nickname);
    this.userService.zUsername.parse(username);
    this.userService.zPassword.parse(password);
    const uid = this.userService.genNumberString(10);

    const res = await this.prismaService.user.create({
      data: {
        userId: uid,
        nickname,
        username,
        password,
      },
    });
    console.log(res);
    return 'hello';
  }
}
