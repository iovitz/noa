import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

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

  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    return pass;
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async generateSession(userid: string) {
    const session = uuidv4();

    // 保存session
    await this.prismaService.session.create({
      data: {
        session: session,
        userid: userid,
        expires: moment(new Date()).add(1, 'month').toDate(),
      },
    });
    return session;
  }
}
