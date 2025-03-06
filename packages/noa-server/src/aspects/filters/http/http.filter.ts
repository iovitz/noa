import {
  ArgumentsHost,

  Catch,

  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { contentType } from 'mime-types'
import { HeaderKeys } from 'src/shared/constans/header'
import { Tracer } from 'src/shared/tracer/tracer'

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  private tracer = new Tracer(HttpFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Res>()
    const req = ctx.getRequest<Req>()

    const status = exception.getStatus()

    const errorResponse = {
      code: status * 100,
      message: exception.message,
    }

    this.tracer.info(`-ERR[${status}] ${exception.message}`, {
      status,
      tracerId: req.tracerId,
      code: errorResponse.code,
      cost: res.getCostNs(),
      cid: req.clientId,
      path: req.path,
    })

    res.setHeader(HeaderKeys.ContentType, contentType('json') as string)
    res.status(status)
    res.send(errorResponse)
  }
}
