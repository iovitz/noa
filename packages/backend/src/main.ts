import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { ZodExceptionFilter } from './exceptors/zod.exceptor';
import { HttpExceptionFilter } from './exceptors/http.exceptor';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import 'winston-daily-rotate-file';
import { AllErrorExceptionFilter } from './exceptors/all.exceptor';
import { ValidationPipe } from './pipes/validation.pipe';

const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(ConfigService);

  // 虚拟路径为 static
  app.useStaticAssets('public', {
    prefix: '/',
  });

  app.useGlobalPipes(new ValidationPipe(logger));
  app.useGlobalFilters(new AllErrorExceptionFilter(logger));
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalFilters(new ZodExceptionFilter(logger));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // DEVELOP情况下允许跨院

  app.enableCors({
    origin: ['localhost:5173'],
  });

  await prisma.$disconnect();

  app.setGlobalPrefix(configService.get('API_GLOBAL_PREFIX'));
  // app.useSt;

  const appPort = Number(configService.get('APP_PORT')) || 28257;
  await app.listen(appPort);
  logger.verbose(`Server running in http://localhost:${appPort}`);
}

bootstrap();
