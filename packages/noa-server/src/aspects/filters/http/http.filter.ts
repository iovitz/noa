import {
  ArgumentsHost,

  Catch,

  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { contentType } from 'mime-types'
import { HeaderKeys } from 'src/shared/constans/header'

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Res>()
    const req = ctx.getRequest<Req>()

    const status = exception.getStatus()

    const errorResponse = {
      code: status * 100,
      message: exception.message,
    }
    console.error(exception)

    res.tracer.log(`-ERR[${status}] ${exception.message}`, {
      status,
      code: errorResponse.code,
      cost: res.getCostNs(),
      cid: res.clientId,
      path: req.path,
    })

    res.setHeader(HeaderKeys.ContentType, contentType('json') as string)
    res.status(status)
    res.send(errorResponse)
  }
}
