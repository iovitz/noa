import { Injectable, LoggerService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'winston'
import { appLogger, formatLogContext } from '../../shared/tracer/tracer'
import { LogContext } from '../../shared/tracer/tracer.types'
import 'winston-daily-rotate-file'

class BaseTracer implements LoggerService {
  constructor(private logger: Logger) {}

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
    return new BaseTracer(
      this.logger.child({
        scope,
      }),
    ) as TracerService
  }
}

@Injectable()
export class TracerService extends BaseTracer {
  constructor(private config: ConfigService) {
    super(appLogger)
  }
}
