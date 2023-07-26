import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { INestApplication } from '@nestjs/common';

export class RedisIoAdapter extends IoAdapter {
  constructor(app: INestApplication) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    options = {
      ...options,
    };

    // 这里补充校验逻辑
    options.allowRequest = async (request, allowFunction) => {
      try {
        const query = request.url.split('?')[1];
        const session = new URLSearchParams(query).get('session');
        console.log(session);
        return allowFunction(null, true);
      } catch (error) {
        return allowFunction('Unauthorized', false);
      }
    };
    const server = super.createIOServer(port, options) as Server;

    return server;
  }
}
