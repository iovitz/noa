import type { NestExpressApplication } from '@nestjs/platform-express'
import { BadRequestException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as pkg from '../package.json'
import { AppModule } from './app.module'
import { rootLogger, TracerService } from './util/tracer/tracer.service'

// 防止未捕获异常导致进程退出
process.on('unhandledRejection', (reason, promise) => {
  rootLogger.error('###Unhandle Rejection Promise', promise)
  rootLogger.error('###Unhandle Rejection Reason', reason)
})

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // 先不打印日志，放入缓冲区，直到指定了Logger才进行打印
    bufferLogs: true,
  })

  const rootTracer = app.get(TracerService)

  const appTracer = rootTracer.child('APP')

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

  rootTracer.error('niubi', new Error('fafa'))
  rootTracer.error('niubi', new UnauthorizedException('fafa'))
  rootTracer.error('niubi', new UnprocessableEntityException('fafa'))
  rootTracer.error('niubi', new BadRequestException('fafa'))

  // 不要用，否则中间件会报错
  // app.setGlobalPrefix('/noa')

  const appPort = 19001

  await app.listen(appPort)

  appTracer.log(`Server running in http://127.0.0.1:${appPort}`)
}

bootstrap()
