import type { NextRequest } from 'next/server'
import { customAlphabet } from 'nanoid'
import { NextResponse } from 'next/server'
import { logger } from './shared/logger/logger'

// middleware运行环境部署标准的Node.js runtime，而是Next.js自己内置的 Edge Runtime
// 很多Node.js的API在 Edge Runtime下都不支持。 像 log4js 这样的日志库在middleware里无法正常运行。所以想在middleware里记录访问日志的路走不通。

const randomIdGenerator = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  10,
)

export function middleware(request: NextRequest) {
  const clientId = request.cookies.get('client-id')?.value ?? randomIdGenerator()
  logger.info(`+${clientId} ${request.method} ${request.url}`)

  const response = NextResponse.next()

  response.cookies.set('client-id', clientId)

  return response
}

export const config = {
  matcher: '/api/:path*',
}
