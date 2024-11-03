import {
  CallHandler,
  ExecutionContext,

  Injectable,

  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HeaderKeys } from 'src/shared/constans/header'
import { SKIP_RESPONSE_FORMAT_KEY } from 'src/shared/constans/meta-keys'

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
  constructor() {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = ctx.getHandler()
    const req = ctx.switchToHttp().getRequest<Req>()
    const res = ctx.switchToHttp().getResponse<Res>()
    const skipFormat = Reflect.getMetadata(SKIP_RESPONSE_FORMAT_KEY, handler)
    return next.handle().pipe(
      map((data) => {
        // 跳过format
        if (skipFormat || res.getHeader(HeaderKeys.ContentType)) {
          req.tracer.log(`Skip Response Format`)
          return data
        }
        return {
          data,
          code: 0,
          message: 'success',
        }
      }),
    )
  }
}
