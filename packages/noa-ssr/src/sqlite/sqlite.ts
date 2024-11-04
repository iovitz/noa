import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { settings } from '../settings'

export const sqliteClient = drizzle({ client: new Database(settings.sqliteUrl) })
