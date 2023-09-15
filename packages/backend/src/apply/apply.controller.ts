import { Body, Controller, Post, Request } from '@nestjs/common';
import { FriendApplyDTO } from './apply.dto';
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
}
