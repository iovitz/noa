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
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './user.dto';

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
        userid: true,
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
        const session = uuidv4();
        console.log(
          moment(new Date()).add(1, 'month').millisecond().toLocaleString(),
        );
        this.prismaService.session.create({
          data: {
            session: session,
            userid: user.userid,
            expires: moment(new Date())
              .add(1, 'month')
              .millisecond()
              .toLocaleString(),
          },
        });

        return {
          userid: user.userid,
          session: session,
          email: user.email,
          username: user.username,
          nickname: user.nickname,
        };
      }
    }

    throw new HttpException('账号或密码错误', HttpStatus.BAD_REQUEST);
  }

  @Post('/register')
  async register(@Body() body: RegisterDTO) {
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
      const userid = this.userService.genNumberString(10);
      const existsUser = await this.prismaService.user.findFirst({
        where: {
          userid,
        },
      });
      if (existsUser) return await getUserId();
      return userid;
    };

    const userid = await getUserId();
    this.logger.log('generate user id', {
      userid,
    });

    this.prismaService.$transaction([
      this.prismaService.user.create({
        data: {
          userid: userid,
          nickname,
          username,
          password: await this.userService.encryptPassword(password),
        },
      }),
      this.prismaService.userProfile.create({
        data: {
          userid,
        },
      }),
    ]);

    return 'hello';
  }
}
