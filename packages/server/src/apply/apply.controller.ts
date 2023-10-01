import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
} from '@nestjs/common';
import { FriendApplyDTO, FriendApplyPassDTO } from './apply.dto';
import { ApplyService } from './apply.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { ApplyRequestType } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventName } from 'src/common/const/events';

@Controller('apply')
export class ApplyController {
  constructor(
    private applyervice: ApplyService,
    private prismaService: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}
  @Post('/friend')
  async postFriends(
    @Body() body: FriendApplyDTO,
    @Request() req: ExpressRequest,
  ) {
    const { friend_id, reason } = body;
    const userid = req.userid;
    console.log(userid);
    const existsApply = await this.prismaService.applyRequest.findFirst({
      where: {
        userid: friend_id,
        type: ApplyRequestType.Friend,
        from: userid,
      },
    });
    // 如果申请已经存在，更新Message
    if (existsApply) {
      await this.prismaService.applyRequest.update({
        where: {
          id: existsApply.id,
        },
        data: {
          reason,
        },
      });
    } else {
      // 否则创建Message
      await this.prismaService.applyRequest.create({
        data: {
          userid: friend_id,
          type: ApplyRequestType.Friend,
          reason,
          from: userid,
        },
      });
    }
    // 创建成功后通过长链推送消息
    this.eventEmitter.emit(EventName.ApplyFriend, {
      userid: friend_id,
      reason,
      from: userid,
    });
    return 'success';
  }

  @Get('/friend')
  async getFriendApplyList(@Request() req: ExpressRequest) {
    const { userid } = req;
    return await this.prismaService.applyRequest.findMany({
      where: {
        userid: userid,
      },
      select: {
        from: true,
        reason: true,
        pass: true,
      },
    });
  }

  @Post('/friend/pass')
  async passFriendApply(
    @Request() req: ExpressRequest,
    @Body() body: FriendApplyPassDTO,
  ) {
    const { userid } = req;
    const { from } = body;
    // 判断是否已经是好友
    const friendItem = await this.prismaService.friend.findFirst({
      where: {
        userid: userid,
        friendid: from,
      },
    });
    const apply = await this.prismaService.applyRequest.findFirst({
      where: {
        userid,
        from,
      },
    });
    if (friendItem) {
      throw new BadRequestException('好友已经存在噜');
    }
    if (!apply) {
      throw new BadRequestException('好友申请不存在');
    }
    await this.prismaService.$transaction([
      this.prismaService.applyRequest.update({
        where: {
          id: apply.id,
        },
        data: {
          pass: true,
        },
      }),
      // 创建两条好友记录
      this.prismaService.friend.createMany({
        data: [
          {
            userid,
            friendid: from,
          },
          {
            userid: from,
            friendid: userid,
          },
        ],
      }),
    ]);
    return 'success';
  }
}
