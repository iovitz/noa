import { Controller, Get, Request } from '@nestjs/common';
import { Request as ExpressResPonse } from 'express';

@Controller('log')
export class LogController {
  @Get('info')
  getInfos(@Request() res: ExpressResPonse) {
    console.log(res.ip);
    return '12';
  }
}
