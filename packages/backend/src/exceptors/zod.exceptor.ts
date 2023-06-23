import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: ZodError, host: ArgumentsHost) {
    this.logger.log('ZodExceptionFilter', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = {
      code: HttpStatus.BAD_REQUEST,
      message: 'Parameter verification failed',
      data: exception.issues.map((issue) => {
        return issue.message;
      }),
    };
    // 设置返回的状态码、请求头、发送错误信息
    response.status(HttpStatus.BAD_REQUEST);
    response.send(errorResponse);
  }
}
