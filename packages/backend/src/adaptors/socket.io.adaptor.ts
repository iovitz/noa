import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { INestApplication, LoggerService } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';

export class SocketIoAdapter extends IoAdapter {
  constructor(
    app: INestApplication,
    private logger: LoggerService,
    private prismaService: PrismaService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    options = {
      ...options,
    };

    // 这里补充校验逻辑
    options.allowRequest = async (request, allowFunction) => {
      const query = request.url?.split('?')[1];
      const session = new URLSearchParams(query).get('session');
      try {
        this.logger.log(session, 'AllowRequest');
        const sessionItem = await this.prismaService.session.findFirst({
          where: {
            session,
          },
          select: {
            expires: true,
            userid: true,
          },
        });
        if (!sessionItem) throw Error('Invalid Session');
        const { expires } = sessionItem;
        if (Number(expires) < Date.now()) {
          throw new Error('Expiration of certification');
        }
        return allowFunction(null, true);
      } catch (error) {
        this.logger.error(error, 'invalid token');
        return allowFunction('Unauthorized', false);
      }
    };
    const server = super.createIOServer(port, options) as Server;

    return server;
  }
}
