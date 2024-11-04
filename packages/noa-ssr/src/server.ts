import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'
import { settings } from './settings'
import { logger } from './shared/logger'
import { sqliteClient } from './sqlite/sqlite'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.NOA_PORT ? Number(process.env.NOA_PORT) : 9393
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(handler)

  const io = new Server(httpServer)

  if (sqliteClient.$client.open) {
    logger.info('Sqlite ready at: ', settings.sqliteUrl)
  }

  io.on('connection', () => {
    // ...
  })

  httpServer
    .once('error', (err) => {
      logger.error('Server Running Fail', err)
      process.exit(1)
    })
    .listen(port, () => {
      logger.info(`Server ready on http://${hostname}:${port}`)
    })
})
