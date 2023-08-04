import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Param,
  Post,
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

  @Get('/:page')
  getMomentsByPage(@Param('page') page: string) {
    return page;
  }

  @Post('/publish')
  publishMoment(@Body() body: PublishMomentDTO) {
    this.momentsService.createMoment(body);
    return body;
  }
}
