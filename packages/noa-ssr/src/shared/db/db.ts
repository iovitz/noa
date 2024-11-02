import { homedir } from 'node:os'
import path from 'node:path'
import { drizzle } from 'drizzle-orm/better-sqlite3'

import { logger } from '../logger/logger'

const dbPath = path.join(homedir(), 'sqlite/noa.sqlite')
export const sqliteClient = drizzle(dbPath)
logger.info('Sqlite DB file is: ', dbPath)
