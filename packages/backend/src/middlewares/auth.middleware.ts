import {
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const clientSession = req.headers.authorization;
    if (!clientSession) {
      throw new UnauthorizedException('Invalid Session');
    }
    const sessionItem = await this.prismaService.session.findFirst({
      where: {
        session: clientSession,
      },
    });
    if (!sessionItem) {
      throw new UnauthorizedException('Invalid Session');
    }
    req.userid = sessionItem.userid;
    next();
  }
}
