import { Body, Controller, Post, Request } from '@nestjs/common';
import { FriendApplyDTO } from './apply.dto';
import { ApplyService } from './apply.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { ApplyRequestType } from '@prisma/client';

@Controller('apply')
export class ApplyController {
  constructor(
    private applyervice: ApplyService,
    private prismaService: PrismaService,
  ) {}
  @Post('/friend')
  postFriends(@Body() body: FriendApplyDTO, @Request() req: ExpressRequest) {
    const { friend_id, reason } = body;
    const userid = req.userid;
    return this.prismaService.applyRequest.create({
      data: {
        userid: friend_id,
        type: ApplyRequestType.Friend,
        reason,
        from: userid,
      },
    });
  }
}
