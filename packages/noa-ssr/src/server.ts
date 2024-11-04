import { createServer } from 'node:http'
import process from 'node:process'
// eslint-disable-next-line node/no-deprecated-api
import { parse } from 'node:url'
import next from 'next'
import { db } from './shared/db/db'
import { logger } from './shared/logger/logger'

const port = Number.parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

Promise.all([
  app.prepare(),
]).then(async () => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  logger.info(
    `Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`,
  )
}).catch((err) => {
  console.error('###服务启动失败', err)
})
