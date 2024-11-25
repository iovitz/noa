import {
  CallHandler,
  ExecutionContext,

  Injectable,

  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class LogInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req: Req = context.switchToHttp().getRequest()
    const { method, originalUrl } = req

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
