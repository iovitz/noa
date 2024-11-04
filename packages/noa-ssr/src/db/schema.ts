import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const User = mysqlTable('user', {
  int: int().primaryKey(),
  name: varchar({ length: 20 }).notNull(),
  phone: varchar({ length: 20 }).notNull(),
  password: varchar({ length: 32 }).notNull(),
})

export const Page = mysqlTable('page', {
  int: int().primaryKey(),
  account_id: int().notNull(),
  page_name: varchar({ length: 20 }).notNull(),
  components: varchar({ length: 500 }).notNull(),
  tdk: varchar({ length: 20 }).notNull(),
  desc: varchar({ length: 100 }).notNull(),
})

export const Component = mysqlTable('component', {
  int: int().primaryKey(),
  type: varchar({ length: 50 }).notNull(),
  page_id: int().notNull(),
  account_id: int().notNull(),
  options: varchar({ length: 500 }).notNull(),
})

export const ComponentData = mysqlTable('component_data', {
  int: int().primaryKey(),
  page_id: int().notNull(),
  account_id: int().notNull(),
  props: varchar({ length: 500 }).notNull(),
})
