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
        const consoleTransport = new transports.Console({
          // 使用时间戳和nest样式
          format: format.combine(
            format.colorize(),
            format.timestamp(),
            utilities.format.nestLike(process.env.NODE_ENV),
          ),
        });
        const verboseTransport = new transports.DailyRotateFile({
          dirname: `logs/${env}/verbose`,
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'verboses',
          format: format.combine(
            format.colorize(),
            format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
            format.printf((i) => {
              return `${i.level} ${[i.timestamp]} ${i.message} ${JSON.stringify(
                i.stack,
              )} ${i.context}`;
            }),
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
              console.log(i);
              prismaService.serverLog
                .create({
                  data: {
                    level: i.level,
                    message: i.context + '' + i.message,
                    logid: '-------',
                    content: '',
                    timestamp: '',
                    userId: '',
                  },
                })
                .catch(void 0);
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
            format.colorize(),
            format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
            format.printf((i) => {
              return `${i.level} ${[i.timestamp]} ${
                i.message ?? ''
              } ${JSON.stringify(i.stack)} ${i.context}`;
            }),
          ),
        });
        return {
          level: logLevel,
          transports: [
            consoleTransport,
            verboseTransport,
            infoTransport,
            errorTransport,
          ],
        };
      },
    }),
  ],
})
export class LoggerModule {}
