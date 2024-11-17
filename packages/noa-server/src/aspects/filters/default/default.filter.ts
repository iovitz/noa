import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { contentType } from 'mime-types'
import { HeaderKeys } from 'src/shared/constans/header'
import * as status from 'statuses'

@Catch(Error)
export class DefaultFilter<Error> implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Res>()

    res.tracer.error('- ERR 500', exception.toString())

    const errorResponse = {
      code: 50000,
      message: status(HttpStatus.INTERNAL_SERVER_ERROR),
    }
    res.setHeader(HeaderKeys.ContentType, contentType('json') as string)
    res.status(500)
    res.send(errorResponse)
  }
}
