import type { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as pkg from '../package.json'
import { AppModule } from './app.module'
import { Tracer } from './services/tracer/tracer.service'
import { appLogger, formatLogContext } from './shared/tracer/tracer'

// 防止未捕获异常导致进程退出
process.on('unhandledRejection', (reason: Error) => {
  appLogger.error('###Unhandle Rejection Promise', formatLogContext(reason))
})

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // 先不打印日志，放入缓冲区，直到指定了Logger才进行打印
    bufferLogs: true,
  })

  const appTracer = new Tracer('APP')

  app.useLogger(appTracer)

  appTracer.log('Application Running', {
    version: pkg.version,
  })

  app.useStaticAssets('public', {
    // 虚拟路径为 static
    prefix: '/static',
  })

  // 配置 EJS 模板引擎
  app.setBaseViewsDir('views')
  app.setViewEngine('ejs')

  // 允许跨域
  // app.enableCors({});

  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('doc', app, swaggerDocument)

  // 不要用，否则中间件会报错
  // app.setGlobalPrefix('/noa')

  const appPort = 19001

  await app.listen(appPort)

  appTracer.log(`Server running in http://127.0.0.1:${appPort}`)
}

bootstrap()
