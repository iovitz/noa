import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { get } from 'lodash'
import { map, Observable } from 'rxjs'
import { Tracer } from 'src/shared/tracer/tracer'

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  tracer = new Tracer(ContextInterceptor.name)

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req: Req = context.switchToHttp().getRequest()
    const { method, originalUrl } = req

    // 注入PageId
    req.pageId = get(req, 'params.pageId', null)

    this.tracer.info(`+REQ：${method} ${originalUrl}`, {
      tracerId: req.tracerId,
      body: req.body,
      query: req.query,
    })

    return next.handle().pipe(
      map((data) => {
        return data
      }),
    )
  }
}
