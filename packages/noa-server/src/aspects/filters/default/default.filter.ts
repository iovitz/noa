import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { stringify } from 'safe-stable-stringify'
import * as status from 'statuses'

@Catch(Error)
export class DefaultFilter<Error> implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Res>()

    console.error(exception)
    res.tracer.error('- ERR 500', stringify(exception))

    const errorResponse = {
      code: 50000,
      message: status(HttpStatus.INTERNAL_SERVER_ERROR),
    }
    res.status(500)
    res.send(errorResponse)
  }
}
