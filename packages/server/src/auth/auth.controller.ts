import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
  Post,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LogOutDTO, LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginDTO) {
    const { username, password } = body;
    const user = await this.authService.findUser({ username });

    if (user) {
      const res = await this.authService.comparePassword(
        password,
        user.password,
      );
      if (res) {
        const { session } = await this.authService.generateSession(user.userid);
        return {
          userid: user.userid,
          session,
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          desc: user.desc,
        };
      }
    }

    throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
  }

  @Delete('/logout')
  async logout(@Body() body: LogOutDTO) {
    const { session } = body;
    await this.authService.deleteSession(session);
    return 'Logout Success!';
  }

  @Post('/register')
  async register(@Body() body: RegisterDTO) {
    const { nickname, username, password } = body;
    const existsUser = await this.authService.findUser({
      username,
    });

    if (existsUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const userid = await this.authService.genUserId();

    this.logger.log('generate user id', {
      userid,
    });

    const [user] = await this.authService.createUser({
      userid,
      nickname,
      username,
      password,
    });

    const { session } = await this.authService.generateSession(user.userid);

    return {
      userid: user.userid,
      session,
      avatar: user.avatar,
      username: user.username,
      nickname: user.nickname,
      desc: user.desc,
    };
  }
}
