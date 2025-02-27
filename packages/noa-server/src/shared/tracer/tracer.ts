import type { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file'
import { homedir } from 'node:os'
import * as path from 'node:path'
import * as process from 'node:process'
import * as chalk from 'chalk'
import { isEmpty, isNil, omit } from 'lodash'
import * as pkg from 'package.json'
import { stringify } from 'safe-stable-stringify'
import { LEVEL, MESSAGE, SPLAT } from 'triple-beam'
import { createLogger, format, transports } from 'winston'
import { ErrorContext, Format, FormatedContext, LogContext, LogInfo } from './tracer.types'
import 'winston-daily-rotate-file'

const ERROR = Symbol('ERROR')
const isProd = process.env.NODE_ENV === 'production'

const logLevelColors = {
  debug: chalk.bgGray,
  info: chalk.bgBlue,
  warn: chalk.bgYellow,
  error: chalk.bgRed,
}

export const appLogger = createRootLogger()
export function createRootLogger() {
  const rootLogger = createLogger({
    transports: [
      new transports.DailyRotateFile({
        ...getCommonRotateFileOption('info'),
      }),
      new transports.DailyRotateFile({
        ...getCommonRotateFileOption('warn'),
      }),
      new transports.DailyRotateFile({
        ...getCommonRotateFileOption('error'),
      }),
    ],
  })
  let instanceId = `${process.pid}`
  if (process.env.NODE_APP_INSTANCE) {
    instanceId += `-${process.env.NODE_APP_INSTANCE}`
  }
  if (process.env.pm_id) {
    instanceId += `-${process.env.pm_id}`
  }

  // 开发环境启用控制台日志
  if (!isProd) {
    rootLogger.add(
      new transports.Console({
        level: 'debug',
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
              instanceId,
              name,
              tracerId,
              scope,
              stack,
              payload,
              ...rest
            } = omit(info, ERROR, SPLAT, LEVEL, MESSAGE)
            // 错误日志特别输出
            const restStr = isEmpty(rest) ? '' : stringify(rest)
            const levelChalk = logLevelColors[level as string] ?? chalk.blue
            return `${levelChalk(level)}${insertOutput(instanceId)} ${chalk.gray(timestamp)}${chalk.blue(insertOutput(scope))}${chalk.yellow(insertOutput(tracerId))}${chalk.green(insertOutput(name))}${insertOutput(message)}${insertOutput(payload)}${insertOutput(
              stack,
            )}${insertOutput(restStr)}`.replace(/[\r\n]+/g, '↵')
          }),
        ),
      }),
    )
  }
  return rootLogger.child({
    instanceId,
  })
}

function getCommonStyleFormat(): Format[] {
  return [
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.printf(formatOutput),
  ]
}
function getCommonRotateFileOption(
  level: string,
): DailyRotateFileTransportOptions {
  return {
    level,
    dirname: path.join(homedir(), 'logs', pkg.name),
    filename: `${level}.log`,
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '3d',
    format: format.combine(...getCommonStyleFormat()),
  }
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
    instanceId,
    scope,
    stack,
    tracerId,
    payload,
    ...rest
  } = omit(info, ERROR, SPLAT, LEVEL, MESSAGE)
  // 错误日志特别输出
  const restStr = isEmpty(rest) ? '' : stringify(rest)
  return `${[timestamp]}${insertOutput(instanceId)} ${level}${insertOutput(scope)}${insertOutput(tracerId)}${insertOutput(name)}${insertOutput(message)}${insertOutput(payload)}${insertOutput(
    stack,
  )}${insertOutput(restStr)}`.replace(/[\r\n]+/g, '↵')
}

const objectToString = (obj: unknown) => {
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
