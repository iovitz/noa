import { Logger } from 'src/shared/logger/logger'

export function GET() {
  const logger = new Logger('niubi')
  logger.error('niubi', { name: 'zs' })
  return Response.json({
    name: 'lisi',
  })
}
