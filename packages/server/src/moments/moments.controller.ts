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

@Controller('moments')
export class MomentsController {
  constructor(
    private momentsService: MomentsService,
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
  publishMoment(@Body() body: PublishMomentDTO) {
    this.momentsService.createMoment(body);
    return body;
  }
}
