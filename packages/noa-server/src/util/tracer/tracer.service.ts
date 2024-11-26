import { Injectable, LoggerService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'winston'
import { createRootLogger, formatNestJSLog } from './tracer'
import { LogContext } from './tracer.types'
import 'winston-daily-rotate-file'

export const rootLogger = createRootLogger(process.env.NODE_ENV === 'production' ? 'info' : 'debug')

class BaseTracer implements LoggerService {
  constructor(private logger: Logger) {}

  log(message: string, context?: LogContext) {
    this.logger.info(message, formatNestJSLog(context))
  }

  error(message: string, context?: LogContext) {
    this.logger.error(message, formatNestJSLog(context))
  }

  warn(message: string, context?: LogContext) {
    this.logger.warn(message, formatNestJSLog(context))
  }

  debug(message: string, context?: LogContext) {
    this.logger.debug(message, formatNestJSLog(context))
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
    super(rootLogger)
  }
}
