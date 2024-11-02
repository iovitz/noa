import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text({ mode: 'text' }).notNull(),
})
