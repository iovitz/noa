import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { Response } from 'express';
import { ParamsException } from 'src/common/errors';

@Catch(ParamsException)
export class ParamsExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: ParamsException, host: ArgumentsHost) {
    this.logger.error(exception.message, exception.stack, 'ParamsException');
    console.log('============');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.errorList,
    };
    response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    response.send(errorResponse);
  }
}
