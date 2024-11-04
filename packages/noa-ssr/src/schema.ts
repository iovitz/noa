import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const User = mysqlTable('table', {
  int: int().primaryKey(),
  nickname: varchar({ length: 20 }).notNull(),
  password: varchar({ length: 30 }).notNull(),
})
