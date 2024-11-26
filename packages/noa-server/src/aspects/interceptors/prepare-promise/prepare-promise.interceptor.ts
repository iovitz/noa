import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class PreparePromiseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 获取UserID
    // const req = context.switchToHttp().getRequest<Req>()
    // req.promiseManager.add('123123')
    return next.handle()
  }
}
