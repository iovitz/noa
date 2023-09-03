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
    const res = await this.prismaService.applyRequest.create({
      data: {
        userid: friend_id,
        type: ApplyRequestType.Friend,
        reason,
        from: userid,
      },
    });
    this.eventEmitter.emit(EventName.ApplyFriend, {
      userid: friend_id,
      reason,
      from: userid,
    });
    return res;
  }
}
