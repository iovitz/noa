import { homedir } from 'node:os'
import * as path from 'node:path'
import * as process from 'node:process'
import { isEmpty, omit } from 'lodash'
import * as pkg from 'package.json'
import { stringify } from 'safe-stable-stringify'
import { LEVEL, MESSAGE, SPLAT } from 'triple-beam'
import { createLogger, format, transports } from 'winston'
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file'

const ERROR = Symbol('ERROR')

type Format = ReturnType<typeof format.timestamp>

interface LogInfo {
  name?: string
  pid?: number
  traceInfo?: string
  msgPrefix?: string
  stack?: string
  payload?: string
  [key: string | symbol]: unknown
}

export function createRootLogger(level: string) {
  const rootLogger = createLogger({
    transports: [
      new transports.Console({
        level,
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
    maxFiles: '7d',
    format: format.combine(...getCommonStyleFormat()),
  }
}

function insertOutput(v: unknown) {
  if (!v)
    return ''
  const content = typeof v === 'object' ? stringify(v) : v
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
