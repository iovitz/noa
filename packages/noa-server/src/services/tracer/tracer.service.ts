import { LoggerService, Provider, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Logger } from 'winston'
import { appLogger, formatLogContext } from '../../shared/tracer/tracer'
import { LogContext } from '../../shared/tracer/tracer.types'
import 'winston-daily-rotate-file'

export class Tracer implements LoggerService {
  private logger: Logger

  constructor(scope?: string) {
    this.logger = scope ? appLogger.child({ scope }) : appLogger
  }

  /**
   * log接口开给nestjs内部信息输出
   * @deprecated 使用info方法输出日志
   * @param message
   * @param context
   */
  log(message: string, context?: LogContext) {
    this.logger.info(message, formatLogContext(context))
  }

  info(message: string, context?: LogContext) {
    this.logger.info(message, formatLogContext(context))
  }

  error(message: string | Error, context?: LogContext) {
    // Nest内部抛出的异常
    if (typeof message === 'string') {
      this.logger.error(message, formatLogContext(context))
    }
    else {
      this.logger.error('System Error', formatLogContext(message))
    }
  }

  warn(message: string, context?: LogContext) {
    this.logger.warn(message, formatLogContext(context))
  }

  debug(message: string, context?: LogContext) {
    this.logger.debug(message, formatLogContext(context))
  }
}
export const REQUEST_TRACER = Symbol('REQUEST_TRACER')

export const RequestTracerProvider: Provider = {
  provide: REQUEST_TRACER,
  scope: Scope.REQUEST, // 确保每个请求都会生成一个新的实例
  inject: [REQUEST],
  useFactory: (req: Req) => {
    if (!req.tracer) {
      req.tracer = new Tracer(req.tracerId ? `Tracer-${req.tracerId}` : 'CLIENT_ID')
    }
    return req.tracer
  },
}
