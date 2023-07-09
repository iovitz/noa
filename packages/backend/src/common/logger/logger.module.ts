import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, utilities } from 'nest-winston';
import { format, transports } from 'winston';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService, PrismaService],
      useFactory(configService: ConfigService, prismaService: PrismaService) {
        const env = configService.get('NODE_ENV');
        const logLevel = configService.get('LOG_LEVEL');
        const isProd = env === 'production';
        const prefix = isProd ? 'PROD' : 'DEV';

        const consoleTransport = new transports.Console({
          level: logLevel,
          // 使用时间戳和nest样式
          format: format.combine(
            format.timestamp(),
            utilities.format.nestLike(prefix),
          ),
        });
        const infoTransport = new transports.DailyRotateFile({
          dirname: `logs/${env}/info`,
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'info',
          format: format.combine(
            format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
            format.printf((i) => {
              // 持久化存储
              if (i.message) {
                prismaService.serverLog
                  .create({
                    data: {
                      level: i.level,
                      message: ensureContentSize(i.message, 255),
                      logid: '-------',
                      timestamp: Date.now(),
                      context: ensureContentSize(i.context, 65535),
                      stack: ensureContentSize(i.stack, 65535),
                      userid: '',
                    },
                  })
                  .catch((e: unknown) => {
                    console.error(e);
                  });
              }
              return `${i.level} ${[i.timestamp]} ${i.message} ${JSON.stringify(
                i.stack,
              )} ${i.context}`;
            }),
            format.colorize(),
          ),
        });
        const errorTransport = new transports.DailyRotateFile({
          dirname: `logs/${env}/error`,
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
          format: format.combine(
            format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
            format.printf((i) => {
              return `${i.level} ${[i.timestamp]} ${i.message ?? ''} ${
                i.stack
              } ${i.context}`;
            }),
          ),
        });
        return {
          level: logLevel,
          transports: [consoleTransport, infoTransport, errorTransport],
        };
      },
    }),
  ],
})
export class LoggerModule {}

function ensureContentSize(content: unknown, maxLength: number) {
  let str = '';
  if (!content) return '';
  if (typeof content !== 'string') {
    str = JSON.stringify(content);
  }
  if (str.length > maxLength) {
    return str.slice(0, maxLength);
  }
  return str;
}
