import { Injectable, LoggerService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'winston'
import { createRootLogger } from './trace-logger'
import 'winston-daily-rotate-file'

type LogContext =
  | string
  | Error
  | {
    name?: string
    err?: string
    stack?: string
    [key: string]: unknown
  }

class BaseTracer implements LoggerService {
  constructor(private logger: Logger) {}

  private formatContext(context?: LogContext) {
    if (!context)
      return
    if (context instanceof Error) {
      return {
        name: context.name,
        message: context.message,
        // 尽量吧错误都放在同一行方便日志按行过滤查看
        stack: context.stack?.split('\n').join('\\n'),
      }
    }
    if (typeof context === 'object') {
      return context
    }
    return {
      name: context,
    }
  }

  log(message: any, context?: LogContext) {
    this.logger.info(message, this.formatContext(context))
  }

  error(message: any, context?: LogContext) {
    this.logger.error(message, this.formatContext(context))
  }

  warn(message: any, context?: LogContext) {
    this.logger.warn(message, this.formatContext(context))
  }

  debug(message: any, context?: LogContext) {
    this.logger.debug(message, this.formatContext(context))
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
    super(createRootLogger(config.getOrThrow('LOG_LEVEL')))
  }
}
