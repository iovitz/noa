import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { ZodExceptionFilter } from './exceptors/zod.exceptor';
import { HttpExceptionFilter } from './exceptors/http.exceptor';
import { createLogger, format, transports } from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import 'winston-daily-rotate-file';
import { AllErrorExceptionFilter } from './exceptors/all.exceptor';

const prisma = new PrismaClient();

async function bootstrap() {
  // 创建winston实例
  const loggerInstance = createLogger({
    transports: [
      new transports.Console({
        // 使用时间戳和nest样式
        format: format.combine(
          format.timestamp(),
          utilities.format.nestLike('HAHA'),
        ),
      }),
      new transports.DailyRotateFile({
        dirname: `logs/info`,
        filename: '%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'info',
        format: format.combine(
          format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          format.printf(
            (i) =>
              `${i.level} ${[i.timestamp]} ${i.message} ${JSON.stringify(
                i.stack,
              )} ${i.context}`,
          ),
          format.align(),
        ),
      }),
      new transports.DailyRotateFile({
        dirname: 'logs/error',
        filename: '%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'error',
        format: format.combine(
          format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          format.printf(
            (i) =>
              `${i.level} ${[i.timestamp]} ${i.message ?? ''} ${JSON.stringify(
                i.stack,
              )} ${i.context}`,
          ),
          format.align(),
        ),
      }),
    ],
  });

  const Logger = WinstonModule.createLogger({
    instance: loggerInstance,
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: Logger,
  });

  const configService = app.get(ConfigService);

  // 虚拟路径为 static
  app.useStaticAssets('public', {
    prefix: '/public',
  });

  app.useGlobalFilters(new AllErrorExceptionFilter(Logger));
  app.useGlobalFilters(new HttpExceptionFilter(Logger));
  app.useGlobalFilters(new ZodExceptionFilter(Logger));
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
}

bootstrap();
