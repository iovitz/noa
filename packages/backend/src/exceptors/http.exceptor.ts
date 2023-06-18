import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error('HttpExceptionFilter', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      code: status,
      message: message,
    };
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.send(errorResponse);
  }
}
