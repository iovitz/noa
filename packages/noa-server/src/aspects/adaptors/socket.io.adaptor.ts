import { INestApplication, LoggerService } from '@nestjs/common'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { Server, ServerOptions } from 'socket.io'

export class SocketIoAdapter extends IoAdapter {
  constructor(
    app: INestApplication,
    private logger: LoggerService,
  ) {
    super(app)
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    options = {
      ...options,
    }

    // 这里补充校验逻辑
    options.allowRequest = async (request, allowFunction) => {
      const query = request.url?.split('?')[1]
      const session = new URLSearchParams(query).get('session')
      try {
        this.logger.log(session, 'AllowRequest')

        return allowFunction(null, true)
      }
      catch (error) {
        this.logger.error(error, 'invalid session')
        return allowFunction('Unauthorized', false)
      }
    }
    const server = super.createIOServer(port, options) as Server

    return server
  }
}
