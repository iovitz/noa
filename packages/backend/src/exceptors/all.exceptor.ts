import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class AllErrorExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    this.logger.error('AllErrorExceptionFilter', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };
    // 设置返回的状态码、请求头、发送错误信息
    response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    response.send(errorResponse);
  }
}
