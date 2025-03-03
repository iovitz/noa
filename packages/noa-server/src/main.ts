import type { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as pkg from '../package.json'
import { AppModule } from './app.module'
import { Tracer } from './services/tracer/tracer.service'
import { BootstrapFn, startNestApp } from './shared/bootstrap'
import { RcConfig } from './shared/config'

const bootstrap: BootstrapFn = async (appTracer) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: appTracer,
    abortOnError: false,
  })

  app.useStaticAssets('public', {
    // 虚拟路径为 static
    prefix: '/static',
  })

  // 配置 EJS 模板引擎
  app.setBaseViewsDir('views')
  app.setViewEngine('ejs')

  // app.enableCors({});

  // swagger
  if (RcConfig.SWAGGER_ENABLE) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(pkg.name)
      .setDescription(pkg.description)
      .setVersion(pkg.version)
      .build()
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('doc', app, swaggerDocument)
  }

  // 不要用，否则中间件会报错
  // app.setGlobalPrefix('/noa')

  const appPort = RcConfig.APP_PORT

  await app.listen(appPort)

  appTracer.log(`Server running in http://127.0.0.1:${appPort}`)
}

startNestApp(bootstrap)
