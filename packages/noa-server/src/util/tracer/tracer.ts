import type { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file'
import { homedir } from 'node:os'
import * as path from 'node:path'
import * as process from 'node:process'
import { isEmpty, omit } from 'lodash'
import * as pkg from 'package.json'
import { stringify } from 'safe-stable-stringify'
import { LEVEL, MESSAGE, SPLAT } from 'triple-beam'
import { createLogger, format, transports } from 'winston'
import { Format, FormatedContext, LogContext, LogInfo } from './tracer.types'
import 'winston-daily-rotate-file'

const ERROR = Symbol('ERROR')
const isProd = process.env.NODE_ENV === 'production'

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
              pid,
              name,
              scope,
              stack,
              payload,
              ...rest
            } = omit(info, ERROR, SPLAT, LEVEL, MESSAGE)
            // 错误日志特别输出
            const restStr = isEmpty(rest) ? '' : stringify(rest)
            return `${timestamp}${insertOutput(pid)}${insertOutput(level)}${insertOutput(scope)}${insertOutput(name)}${insertOutput(message)}${insertOutput(payload)}${insertOutput(
              stack,
            )}${insertOutput(restStr)}`
          }),
        ),
      }),
    )
  }
  return rootLogger.child({
    pid: process.pid,
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
    filename: `${level}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
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
    pid,
    scope,
    stack,
    payload,
    ...rest
  } = omit(info, ERROR, SPLAT, LEVEL, MESSAGE)
  // 错误日志特别输出
  const restStr = isEmpty(rest) ? '' : stringify(rest)
  return `${[timestamp]}${insertOutput(pid)} ${level}${insertOutput(scope)}${insertOutput(name)}${insertOutput(message)}${insertOutput(payload)}${insertOutput(
    stack,
  )}${insertOutput(restStr)}`
}

export function formatNestJSLog(context?: LogContext): FormatedContext {
  if (context === void 0) {
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
  if (context instanceof Error) {
    return {
      name: context.name,
      message: context.message,
      // 尽量吧错误都放在同一行方便日志按行过滤查看
      stack: context.stack?.split('\n').join('\\n'),
    }
  }
  return {
    payload: isEmpty(context) ? `${context}` : stringify(context),
  }
}
