import { Logger } from 'typeorm'
import { appLogger } from './tracer'

const typeormLogger = appLogger.child('typeorm')
export const typeOrmLogger: Logger = {
  logQuery(query: string) {
    typeormLogger.debug(query)
  },
  logQueryError(error: string | Error, query: string) {
    typeormLogger.error(query, error)
  },
  logQuerySlow(time: number, query: string) {
    typeormLogger.log('Query Slow', { time, query })
  },
  logSchemaBuild(message: string) {
    typeormLogger.debug(`Schema Build: ${message}`)
  },
  logMigration(message: string) {
    typeormLogger.debug(`Schema Build: ${message}`)
  },
  log(level: 'log' | 'info' | 'warn', message: any) {
    typeormLogger.debug('LOG', message)
  },
}
