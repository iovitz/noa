import {
  CallHandler,
  ExecutionContext,

  Injectable,

  NestInterceptor,
} from '@nestjs/common'
import { get } from 'lodash'
import { Observable } from 'rxjs'

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req: Req = context.switchToHttp().getRequest()
    const { method, originalUrl } = req

    // 注入PageId
    req.pageId = get(req, 'params.pageId', null)

    req.tracer.log(`+REQ：${method} ${originalUrl}`, {
      clientId: req.clientId,
      body: req.body,
      query: req.query,
    })

    const data = await next.handle()

    req.tracer.log('-REQ', {
      cost: req.getCostNs(),
      clientId: req.clientId,
    })

    return data
  }
}
