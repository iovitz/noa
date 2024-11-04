import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'mysql',
  schema: './src/schema.ts',
  dbCredentials: {
    url: 'mysql://noa_dev:pzQsZLH0iWs5iP4D@mysql.sqlpub.com:3306/noa_dev',
  },
})
