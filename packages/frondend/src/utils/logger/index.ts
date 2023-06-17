class Logger {
  constructor(private isPrint: boolean) {}
  info(...args: any[]) {
    if(!this.isPrint) return
    console.warn(...args)
  }

  warn(...args: any[]) {
    if(!this.isPrint) return
    console.warn(...args)
  }

  error(...args: any[]) {
    if(!this.isPrint) return
    console.warn(...args)
  }
}

const isPrint = uni.getStorageSync('logger-to-console')
export const logger = new Logger(!!isPrint)