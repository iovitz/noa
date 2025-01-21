import {
  CallHandler,
  ExecutionContext,

  Inject,

  Injectable,

  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HeaderKeys } from 'src/shared/constans/header'
import { SKIP_RESPONSE_FORMAT_KEY } from 'src/shared/constans/meta-keys'
import { REQUEST_TRACER, TracerService } from 'src/utils/tracer/tracer.service'

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
  constructor() {}

  @Inject(REQUEST_TRACER)
  tracer: TracerService

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = ctx.getHandler()
    const res = ctx.switchToHttp().getResponse<Res>()
    const skipFormat = Reflect.getMetadata(SKIP_RESPONSE_FORMAT_KEY, handler)
    return next.handle().pipe(
      map((data) => {
        // 跳过format
        if (skipFormat || res.getHeader(HeaderKeys.ContentType)) {
          this.tracer.log(`Skip Response Format`)
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
