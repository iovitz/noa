import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common'
import { contentType } from 'mime-types'
import { HeaderKeys } from 'src/shared/constans/header'

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  /**
   * 这个函数里不要有任何中间件注入的对象
   * 在客户端发送格式错误的请求时，会走不到中间件的逻辑，直接在这里catch到
   */
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
