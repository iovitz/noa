import moment from 'moment'

export class Logger {
  error(msg: string, context?: unknown) {
    console.error(
      `${(moment().format('YYYY-MM-DD:HH:mm:ss'))}`,
      'ERROR',
      msg,
      context ? JSON.stringify(context) : '',
    )
  }

  warn(msg: string, context?: unknown) {
    console.error(
      `${moment().format('YYYY-MM-DD:HH:mm:ss')}`,
      'WARN',
      msg,
      context ? JSON.stringify(context) : '',
    )
  }

  info(msg: string, context?: unknown) {
    // eslint-disable-next-line no-console
    console.info(
      `${moment().format('YYYY-MM-DD:HH:mm:ss')}`,
      'INFO',
      msg,
      context ? JSON.stringify(context) : '',
    )
  }

  log(msg: string, context?: unknown) {
    // eslint-disable-next-line no-console
    console.info(
      `${moment().format('YYYY-MM-DD:HH:mm:ss')}`,
      'LOG',
      msg,
      context ? JSON.stringify(context) : '',
    )
  }
}

export const logger = new Logger()
