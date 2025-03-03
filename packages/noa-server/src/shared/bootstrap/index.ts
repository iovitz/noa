import process from 'node:process'
import { stringify } from 'safe-stable-stringify'
import { Tracer } from 'src/services/tracer/tracer.service'
import { RcConfig } from '../config'

export type BootstrapFn = (appTracer: Tracer) => Promise<unknown>

export const appTracer = new Tracer('APP')

export async function startNestApp(bootstrapFN: BootstrapFn) {
  setUpErrorHandler(appTracer)
  checkBootstrapEnv(appTracer)
  try {
    const startNs = process.hrtime.bigint()
    appTracer.log('APP Running Start', { time: new Date().toLocaleString() })
    await bootstrapFN(appTracer)
    const cost = Number(process.hrtime.bigint() - startNs).toLocaleString()
    appTracer.log('APP Running Success', { cost })
  }
  catch (e) {
    appTracer.error('### APP Exit With Error!!!!', e)
    process.exit(1)
  }
}

export function setUpErrorHandler(appTracer: Tracer) {
  // 防止未捕获异常导致进程退出
  process.on('unhandledRejection', (reason: Error) => {
    appTracer.error('### Unhandle Rejection Promise', reason)
  })

  process.on('uncaughtException', (error) => {
    appTracer.error('### Unhandle Exception', error)
  })
}

export function checkBootstrapEnv(appTracer: Tracer) {
  appTracer.log('Application Environment', { config: stringify(process.env) })
  appTracer.log('Application Config', { env: stringify(RcConfig) })
  if (process.env.NODE_ENV !== 'production') {
    appTracer.error('App Not Running In Production Mode!!!')
  }
}
