import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  @Post('/login')
  async login(params: any) {
    const res = await this.prisma.user.findMany();
    console.log(res);
    return 'login';
  }

  @Post('/register')
  register(params: any) {
    console.log(this.userService, this.configService.get('age'));
    return 'hello';
  }
}
