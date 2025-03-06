import path from 'node:path'
import process from 'node:process'
import { LoggerService } from '@nestjs/common'
import chalk from 'chalk'
import { isEmpty, isNil, omit } from 'lodash'
import pkg from 'package.json'
import { stringify } from 'safe-stable-stringify'
import { RcConfig } from 'src/shared/config'
import { LEVEL, MESSAGE, SPLAT } from 'triple-beam'
import { createLogger, format, Logger, transports } from 'winston'
import { ErrorContext, Format, FormatedContext, LogContext, LogInfo } from './tracer.types'
import 'winston-daily-rotate-file'

const ERROR = Symbol('ERROR')
const isProd = process.env.NODE_ENV === 'production'

const logLevels = {
  fatal: 50,
  notice: 51,
  bootstrap: 99,
  error: 100,
  warn: 200,
  info: 300,
  http: 400,
  verbose: 500,
  debug: 600,
  silly: Number.MAX_SAFE_INTEGER,
}

const logColorMap = {
  fatal: chalk.magentaBright, // 进程错误
  bootstrap: chalk.green, // 启动日志
  error: chalk.red, // 业务错误
  warn: chalk.yellow, // 业务警告
  info: chalk.blue, // 业务日志
  http: chalk.cyanBright, // http日志
  verbose: chalk.black, // 调试日志
  debug: chalk.blackBright, // 啊我额发我额发我额发我
}
export const appLogger = createRootLogger()
export function createRootLogger() {
  const rootLogger = createLogger({
    level: RcConfig.LOG_LEVEL,
    levels: logLevels,
    defaultMeta: {
      pid: process.pid,
    },
  })

  // 开发环境启用控制台日志
  if (!isProd) {
    rootLogger.add(
      new transports.Console({
        // 使用时间戳和nest样式
        format: format.combine(
          format.timestamp({ format: 'HH:mm:ss.SSS' }),
          format.printf((info: LogInfo) => {
            if (!info)
              return ''
            const {
              timestamp,
              level,
              message,
              pid,
              name,
              tracerId,
              scope,
              stack,
              payload,
              ...rest
            } = omit(info, ERROR, SPLAT, LEVEL, MESSAGE)
            // 错误日志特别输出
            const restStr = isEmpty(rest) ? '' : stringify(rest)
            const levelChalk = logColorMap[level as string] ?? chalk.blue
            return `${levelChalk(level)} ${chalk.gray(timestamp)}${chalk.blue(insertOutput(scope))}${chalk.yellow(insertOutput(tracerId))}${chalk.green(insertOutput(name))}${insertOutput(message)}${insertOutput(payload)}${insertOutput(
              stack,
            )}${insertOutput(restStr)}`.replace(/[\r\n]+/g, '↵')
          }),
        ),
      }),
    )
  }
  else {
    // 生产环境使用日志轮转
    rootLogger.add(getRotateLogTransport('info'))
    rootLogger.add(getRotateLogTransport('warn'))
    rootLogger.add(getRotateLogTransport('error'))
    rootLogger.info('Log with winston rotate!')
  }
  return rootLogger
}

function getCommonStyleFormat(): Format[] {
  return [
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.printf(formatOutput),
  ]
}

function getRotateLogTransport(
  level: string,
) {
  return new transports.DailyRotateFile({
    level,
    dirname: path.join('/var/log', pkg.name),
    filename: `${level}.log`,
    datePattern: RcConfig.LOG_DATA_PATTERN,
    zippedArchive: RcConfig.LOG_ZIPPED_ARCHIVE,
    maxSize: RcConfig.LOG_MAX_SIZE,
    maxFiles: RcConfig.LOG_MAX_FILES,
    format: format.combine(...getCommonStyleFormat()),
  })
}

function insertOutput(v: unknown) {
  if (v === void 0) {
    return ''
  }
  else if (v === null) {
    return 'null'
  }
  const content = v !== null && typeof v === 'object' ? stringify(v) : v
  return ` ${content}`
}

function formatOutput(info: LogInfo) {
  if (!info)
    return ''
  const {
    timestamp,
    level,
    message,
    name,
    pid,
    scope,
    stack,
    tracerId,
    payload,
    ...rest
  } = omit(info, ERROR, SPLAT, LEVEL, MESSAGE)
  // 错误日志特别输出
  const restStr = isEmpty(rest) ? '' : stringify(rest)
  return `${[timestamp]}${insertOutput(pid)} ${level}${insertOutput(scope)}${insertOutput(tracerId)}${insertOutput(name)}${insertOutput(message)}${insertOutput(payload)}${insertOutput(
    stack,
  )}${insertOutput(restStr)}`.replace(/[\r\n]+/g, '↵')
}

function objectToString(obj: unknown) {
  if (isEmpty(obj) || typeof obj !== 'object') {
    return JSON.stringify(obj)
  }
  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      return `${prev}[${key}:${objectToString(value)}]`
    }
    return `${prev}[${key}:${value}]`
  }, '')
}

export function formatLogContext(context?: LogContext): FormatedContext {
  if (isNil(context)) {
    return {
      payload: '',
    }
  }
  // 兼容NestJS的日志风格
  if (typeof context === 'string') {
    return {
      name: context,
    }
  }
  if (Array.isArray(context)) {
    return {
      payload: `[${context.map(c => c?.toString()).join(',')}]`,
    }
  }

  // 错误对象处理
  if (context instanceof Error || context.error instanceof Error) {
    const errorContext: ErrorContext = context instanceof Error ? { error: context } : context as ErrorContext
    const { error, ...rest } = errorContext
    return {
      name: error.name,
      message: error.message,
      // 尽量吧错误都放在同一行方便日志按行过滤查看
      stack: error.stack,
      ...rest,
    }
  }
  const { tracerId, ...payload } = context

  return {
    tracerId,
    payload: isEmpty(payload) ? void 0 : objectToString(payload),
  }
}

export class Tracer implements LoggerService {
  private logger: Logger

  constructor(scope?: string) {
    this.logger = scope ? appLogger.child({ scope }) : appLogger
  }

  fatal(message: string, context?: LogContext) {
    (this.logger as any).fatal(message, formatLogContext(context))
  }

  bootstrap(message: string, context?: LogContext) {
    (this.logger as any).bootstrap(message, formatLogContext(context))
  }

  error(message: string, context?: LogContext) {
    this.logger.error(message, formatLogContext(context))
  }

  warn(message: string, context?: LogContext) {
    this.logger.warn(message, formatLogContext(context))
  }

  info(message: string, context?: LogContext) {
    this.logger.info(message, formatLogContext(context))
  }

  /**
   * @deprecated 使用 `tracer.info` 替代，这个方法只给NestJS内部调用
   * @param message
   * @param context
   */
  log(message: string, context?: LogContext) {
    this.logger.info(message, formatLogContext(context))
  }

  verbose(message: string, context?: LogContext) {
    this.logger.verbose(message, formatLogContext(context))
  }

  debug(message: string, context?: LogContext) {
    this.logger.debug(message, formatLogContext(context))
  }
}
