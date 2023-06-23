import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, utilities } from 'nest-winston';
import { format, transports } from 'winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const logLevel = configService.get('LOG_LEVEL');
        const consoleTransport = new transports.Console({
          // 使用时间戳和nest样式
          format: format.combine(
            format.timestamp(),
            utilities.format.nestLike(process.env.NODE_ENV),
          ),
        });
        const infoTransport = new transports.DailyRotateFile({
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
          ),
        });
        const errorTransport = new transports.DailyRotateFile({
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
                `${i.level} ${[i.timestamp]} ${
                  i.message ?? ''
                } ${JSON.stringify(i.stack)} ${i.context}`,
            ),
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
