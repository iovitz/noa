import { Injectable, LoggerService, Provider, Scope } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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

  log(message: string, context?: LogContext) {
    this.logger.info(message, formatLogContext(context))
  }

  error(message: string, context?: LogContext) {
    this.logger.error(message, formatLogContext(context))
  }

  warn(message: string, context?: LogContext) {
    this.logger.warn(message, formatLogContext(context))
  }

  debug(message: string, context?: LogContext) {
    this.logger.debug(message, formatLogContext(context))
  }

  child(scope: string) {
    return new Tracer(scope) as TracerService
  }
}

@Injectable()
export class TracerService extends Tracer {
  constructor() {
    super()
  }
}

export const REQUEST_TRACER = Symbol('REQUEST_TRACER')

export const RequestTracerProvider: Provider = {
  provide: REQUEST_TRACER,
  scope: Scope.REQUEST, // 确保每个请求都会生成一个新的实例
  inject: [REQUEST, TracerService],
  useFactory: (req: Req, tracer: TracerService) => {
    if (!req.tracer) {
      req.tracer = tracer.child(req.tracerId ?? 'UNKNOWN_CLIENT_ID')
    }
    return req.tracer
  },
}
