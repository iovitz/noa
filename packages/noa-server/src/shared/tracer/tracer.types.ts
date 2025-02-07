import { format } from 'winston'

export type LogContext =
  | string
  | Error
  | {
    error?: Error
    tracerId?: string
    [key: string]: unknown
  } | unknown []

export type FormatedContext = {
  level: string
  name: string
  message: string
  stack: string
  error?: string
  [key: string]: unknown
} | {
  name: string
} | {
  payload: string
}

export type Format = ReturnType<typeof format.timestamp>

export interface LogInfo {
  name?: string
  pid?: number
  traceInfo?: string
  tracerId?: string
  msgPrefix?: string
  stack?: string
  payload?: string
  [key: string | symbol]: unknown
}

export interface ErrorContext {
  error: Error
  [key: string]: unknown
}
