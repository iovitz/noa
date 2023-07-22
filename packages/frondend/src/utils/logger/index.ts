enum LogLevel {
  verbose = 1,
  info,
  warning,
  error,
}

class Logger {
  private level = uni.getStorageSync('logger-to-console') ?? import.meta.env.DEV

  constructor(level: LogLevel) {
    this.level = uni.getStorageSync('app-enable-log') ? LogLevel.verbose : level
  }

  verbose(message: string, ...args: any[]) {
    if (this.level >= LogLevel.verbose) console.log(message, ...args)
  }

  info(message: string, ...args: any[]) {
    if (this.level >= LogLevel.info) console.info(message, ...args)
  }

  warn(message: string, ...args: any[]) {
    if (this.level >= LogLevel.warning) console.warn(message, ...args)
  }

  error(message: string, ...args: any[]) {
    if (this.level >= LogLevel.error) console.error(message, ...args)
  }
}

const level = Number(import.meta.env.VITE_LOG_LEVEL) || LogLevel.error

const logger = new Logger(level)
export default logger
