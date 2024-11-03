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
    // PreparePromise
    // const req = context.switchToHttp().getRequest<Req>();
    // req.promiseManager;
    return next.handle()
  }
}
