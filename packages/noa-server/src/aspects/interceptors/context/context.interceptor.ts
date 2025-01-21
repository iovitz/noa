import {
  CallHandler,
  ExecutionContext,

  Inject,

  Injectable,

  NestInterceptor,
} from '@nestjs/common'
import { get } from 'lodash'
import { Observable } from 'rxjs'
import { REQUEST_TRACER, TracerService } from 'src/utils/tracer/tracer.service'

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  @Inject(REQUEST_TRACER)
  tracer: TracerService

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req: Req = context.switchToHttp().getRequest()
    const { method, originalUrl } = req

    // 注入PageId
    req.pageId = get(req, 'params.pageId', null)

    this.tracer.log(`+REQ：${method} ${originalUrl}`, {
      clientId: req.clientId,
      body: req.body,
      query: req.query,
    })

    const data = await next.handle()

    this.tracer.log('-REQ', {
      cost: req.getCostNs(),
      clientId: req.clientId,
    })

    return data
  }
}
