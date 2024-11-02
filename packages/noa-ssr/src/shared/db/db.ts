import { drizzle } from 'drizzle-orm/mysql2'

// You can specify any property from the mysql2 connection options
export const db = drizzle({
  connection: {
    uri: 'mysql://noa_dev:pzQsZLH0iWs5iP4D@mysql.sqlpub.com:3306/noa_dev',
  },
})
