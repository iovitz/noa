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

    const server = super.createIOServer(port, options) as Server;

    options.allowRequest = async (request, allowFunction) => {
      try {
        console.log('allowRequest valid');
        return allowFunction(null, true);
      } catch (error) {
        return allowFunction('Unauthorized', false);
      }
    };

    return server;
  }
}
