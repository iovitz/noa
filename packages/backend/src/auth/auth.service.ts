import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UtilsService } from 'src/global/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment-timezone';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    return pass;
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.$transaction([
      this.prismaService.user.create({
        data: {
          ...data,
          password: await this.encryptPassword(data.password),
        },
        select: {
          userid: true,
          nickname: true,
          username: true,
          avatar: true,
        },
      }),
      this.prismaService.userProfile.create({
        data: {
          userid: data.userid,
        },
      }),
    ]);
  }

  async findUser(
    where: Prisma.UserWhereInput,
    select: Prisma.UserSelect = {
      userid: true,
      nickname: true,
      username: true,
      password: true,
      avatar: true,
    },
  ) {
    return this.prismaService.user.findFirst({
      where,
      select: select,
    });
  }

  async generateSession(userid: string) {
    const session = uuidv4();
    const expires = moment(new Date()).add(1, 'month').valueOf().toString();

    // 保存session
    await this.prismaService.session.create({
      data: {
        session: session,
        userid: userid,
        expires,
      },
    });
    return {
      session,
      expires,
    };
  }

  deleteSession(session: string) {
    return this.prismaService.session.delete({
      where: {
        session,
      },
    });
  }

  async genUserId() {
    // userid以u开头
    const userid = this.utilsService.genId('u', 10);
    const existsUser = await this.prismaService.user.findFirst({
      where: {
        userid,
      },
    });
    if (existsUser) return await this.genUserId();
    return userid;
  }
}
