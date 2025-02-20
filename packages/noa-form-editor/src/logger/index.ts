import chalk from 'chalk'
import loglevel from 'loglevel'
import prefix from 'loglevel-plugin-prefix'

export const logger: loglevel.RootLogger = loglevel.noConflict()
prefix.reg(logger)
prefix.apply(logger, {
  format(level, name, timestamp) {
    return `${chalk.bgCyanBright.blue(`[${timestamp}]`)} ${chalk.cyan(level)} ${chalk.green(`${name}:`)}`
  },
})
