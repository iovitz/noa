import {
  BadRequestException,
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const clientSession = req.headers.session;
    if (!clientSession) {
      throw new BadRequestException('Invalid Session');
    }
    req.userid = '';
    next();
  }
}
