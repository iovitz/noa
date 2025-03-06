import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { contentType } from 'mime-types'
import { HeaderKeys } from 'src/shared/constans/header'
import { Tracer } from 'src/shared/tracer/tracer'
import status from 'statuses'

@Catch(Error)
export class DefaultFilter implements ExceptionFilter {
  private tracer = new Tracer(DefaultFilter.name)

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Res>()

    this.tracer.error('-ERR 500', {
      error: exception,
      tracerId: res.tracerId,
    })

    const errorResponse = {
      code: 50000,
      message: status(HttpStatus.INTERNAL_SERVER_ERROR),
    }
    res.setHeader(HeaderKeys.ContentType, contentType('json') as string)
    res.status(500)
    res.send(errorResponse)
  }
}
