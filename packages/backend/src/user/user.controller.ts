import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get('/')
  get(params: any) {
    console.log(this.userService, this.configService.get('age'));
    return 'hello';
  }
}
