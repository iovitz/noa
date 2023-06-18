import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { z } from 'zod';

@Injectable()
export class UserService {
  readonly zNickname = z.string().min(1).max(20);
  readonly zUsername = z.string().min(6).max(20);
  readonly zPassword = z.string().min(6).max(20);
  readonly zEmail = z.string().email().min(5).max(50);

  genNumberString(digit = 10) {
    const str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let res = '';
    for (let i = 0, len = str.length; i < digit; i++) {
      const id = Math.floor(Math.random() * len);
      Date.now();
      res += str[id];
    }
    return res;
  }
}
