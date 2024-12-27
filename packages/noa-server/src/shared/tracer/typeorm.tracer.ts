import { Logger } from 'typeorm'
import { appLogger } from './tracer'

const typeormTracer = appLogger.child('typeorm')
export const typeOrmLogger: Logger = {
  logQuery(query: string) {
    typeormTracer.debug(query)
  },
  logQueryError(error: string | Error, query: string) {
    typeormTracer.error(query, error)
  },
  logQuerySlow(time: number, query: string) {
    typeormTracer.log('Query Slow', { time, query })
  },
  logSchemaBuild(message: string) {
    typeormTracer.debug(`Schema Build: ${message}`)
  },
  logMigration(message: string) {
    typeormTracer.debug(`Schema Build: ${message}`)
  },
  log(level: 'log' | 'info' | 'warn', message: any) {
    typeormTracer.debug('LOG', message)
  },
}
