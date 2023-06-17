import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UtilsService } from 'src/common/utils/utils.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private utilsService: UtilsService,
  ) {}

  @Post('/login')
  async login(@Body() body: { username?: string; password?: string }) {
    this.userService.zUsername.parse(body.username);
    this.userService.zPassword.parse(body.password);
    return 'hello';
  }

  @Post('/register')
  register(
    @Body() body: { nickname: string; username: string; password: string },
  ) {
    this.userService.zNickname.parse(body.nickname);
    this.userService.zUsername.parse(body.username);
    this.userService.zPassword.parse(body.password);
    return 'hello';
  }
}
