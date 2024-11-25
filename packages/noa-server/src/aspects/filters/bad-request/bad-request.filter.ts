import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common'
import { contentType } from 'mime-types'
import { HeaderKeys } from 'src/shared/constans/header'

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Res>()

    const status = exception.getStatus()

    const errorResponse = {
      code: status * 100,
      message: exception.message,
    }

    res.setHeader(HeaderKeys.ContentType, contentType('json') as string)
    res.status(status)
    res.send(errorResponse)
  }
}
