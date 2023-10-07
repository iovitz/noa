import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { PublishMomentDTO } from './moment.dto';
import { MomentsService } from './moments.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Controller('moments')
export class MomentsController {
  constructor(
    private momentsService: MomentsService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get('/p/:page')
  getMomentsByPage(
    @Param('page') page: string,
    @Request() req: ExpressRequest,
  ) {
    return req.userid;
  }

  @Post('/publish')
  async publishMoment(
    @Body()
    { content = '', media = [], private: isPrivate = true }: PublishMomentDTO,
    @Request() req: ExpressRequest,
  ) {
    const userid = req.userid;
    console.log({
      userid,
      content,
      media: media.toString(),
      private: isPrivate,
    });
    return await this.prismaService.moment.create({
      data: {
        userid,
        content,
        media: media.toString(),
        private: isPrivate,
      },
      select: {
        id: true,
      },
    });
  }
}
