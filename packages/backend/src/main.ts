import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { HttpExceptionFilter } from './exceptors/http.exceptor';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllErrorExceptionFilter } from './exceptors/all.exceptor';
import { ValidationPipe } from './pipes/validation.pipe';
import { LoggerService } from '@nestjs/common';
import { ParamsExceptionFilter } from './exceptors/validator.exceptor';
import { SocketIoAdapter } from './adaptors/socket.io.adaptor';
import { PrismaService } from './global/prisma/prisma.service';
import * as moment from 'moment-timezone';
moment.tz.setDefault('Asia/Shanghai');

const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  const prismaService = app.get(PrismaService);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(ConfigService);

  // 虚拟路径为 static
  app.useStaticAssets('public', {
    prefix: '/',
  });

  app.useWebSocketAdapter(new SocketIoAdapter(app, logger, prismaService));
  app.useGlobalPipes(new ValidationPipe(logger));
  app.useGlobalFilters(new AllErrorExceptionFilter(logger));
  app.useGlobalFilters(new ParamsExceptionFilter(logger));
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // DEVELOP情况下允许跨院

  app.enableCors({
    origin: ['127.0.0.1:5173'],
  });

  await prisma.$disconnect();

  app.setGlobalPrefix(configService.get('API_GLOBAL_PREFIX'));
  const appPort = parseInt(configService.get('APP_PORT')) || 11000;
  await app.listen(appPort);
  logger.log(`Server running in http://127.0.0.1:${appPort}`, 'bootstrap');
}

bootstrap();
