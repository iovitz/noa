import * as NestjsCommonType from '@nestjs/common';
import { LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'winston';

Logger;
declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV?: 'development' | 'production';
    APP_PORT?: string;
  }
}

// 修正一些内置类型
declare module '@nestjs/common' {
  export interface LoggerService extends NestLoggerService {
    log(message: string, stack: string, context: unknown): void;
    error(message: string, stack: string, context: unknown): void;
    warn(message: string, context: unknown): void;
    debug(message: string, context: unknown): void;
    verbose(message: string, context: unknown): void;
  }
  export default NestjsCommonType;
}
declare module 'http' {
  interface IncomingMessage {
    userid?: string;
  }
}
