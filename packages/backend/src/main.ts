import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await prisma.$disconnect();
  console.log(Number(process.env.APP_PORT) || 28257);
  await app.listen(Number(process.env.APP_PORT) || 28257);
}

bootstrap();
