import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 虚拟路径为 static
  app.useStaticAssets('public', {
    prefix: '/public',
  });
  const configService = app.get(ConfigService);

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
