import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/global/prisma/prisma.service';
import {
  PGetUser,
  BPostLogin,
  BPostRegister,
  BPutUser,
  PGetProfile,
  PPostProfile,
  BDeleteLogout,
} from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get('/test')
  async getTest() {
    this.logger.error(123, '123123');
    return 'hello';
  }

  @Post('/login')
  async login(@Body() body: BPostLogin) {
    const { username, password } = body;
    const user = await this.userService.findUserByUsername(username);

    if (user) {
      const res = await this.userService.comparePassword(
        password,
        user.password,
      );
      if (res) {
        const { session } = await this.userService.generateSession(user.userid);
        return {
          userid: user.userid,
          session,
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
        };
      }
    }

    throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
  }

  @Delete('/logout')
  async logout(@Body() body: BDeleteLogout) {
    const { session } = body;
    await this.userService.deleteSession(session);
    return 'Logout Success!';
  }

  @Post('/register')
  async register(@Body() body: BPostRegister) {
    const { nickname, username, password } = body;
    const existsUser = await this.userService.findUserByUsername(username);

    if (existsUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const userid = await this.userService.genUserId(10);

    console.log(userid);
    this.logger.log('generate user id', {
      userid,
    });

    const [user] = await this.userService.createUser(
      userid,
      nickname,
      username,
      password,
    );

    const { session } = await this.userService.generateSession(user.userid);

    return {
      userid: user.userid,
      session,
      avatar: user.avatar,
      username: user.username,
      nickname: user.nickname,
    };
  }

  @Get('/:userid')
  async getUser(@Param() { userid }: PGetUser) {
    const userInfo = await this.prismaService.user.findFirst({
      where: {
        userid,
      },
      select: {
        userid: true,
        avatar: true,
        nickname: true,
      },
    });
    return userInfo;
  }

  @Put('/:userid')
  async putUser(@Param() { userid }: PGetUser, @Body() { avatar }: BPutUser) {
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

  @Get('/profile/:userid')
  async getProfile(@Param() { userid }: PGetProfile) {
    const userInfo = await this.prismaService.userProfile.findFirst({
      where: {
        userid,
      },
      select: {
        userid: true,
        email: true,
        gender: true,
        phone: true,
        address: true,
      },
    });
    return userInfo;
  }

  @Put('/profile/:userid')
  async putProfile(
    @Param() { userid }: PGetProfile,
    @Body() body: PPostProfile,
  ) {
    const userInfo = await this.prismaService.userProfile.findFirst({
      where: {
        userid,
      },
      select: {
        userid: true,
        email: true,
        gender: true,
        phone: true,
        address: true,
      },
    });
    return userInfo;
  }
}
