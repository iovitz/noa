import { env } from '@/shared/config/config'
import chalk from 'chalk'
import loglevel from 'loglevel'
import prefix from 'loglevel-plugin-prefix'

export const logger: loglevel.RootLogger = loglevel.noConflict()
logger.setDefaultLevel(env.logLevel)
prefix.reg(logger)
prefix.apply(logger, {
  format(level, name, timestamp) {
    return `${chalk.bgCyanBright.blue(`[${timestamp}]`)} ${chalk.cyan(level)} ${chalk.green(`${name}:`)}`
  },
})
