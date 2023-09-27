import * as NestjsCommonType from '@nestjs/common';
import { LoggerService as NestLoggerService } from '@nestjs/common';
import { EventName } from './common/const/events';
import { EventTypes } from './common/type/events';
export { Request } from 'express';

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

// 全局类型
declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ExpressRequest extends Request {
    userid: string;
  }
}

declare module '@nestjs/event-emitter' {
  import { EventEmitter2 as OriginEventEmitter2 } from '@nestjs/event-emitter';
  export declare const OnEvent: (
    event: EventName,
    options?: OnEventOptions | undefined,
  ) => MethodDecorator;

  export declare class EventEmitter2 extends OriginEventEmitter2 {
    emit<T extends EventName>(event: T, value: EventTypes[T]): boolean;
  }
}
