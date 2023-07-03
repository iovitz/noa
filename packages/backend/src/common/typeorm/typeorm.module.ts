import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule as TypeormModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeormModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: configService.get<'mysql'>('DB_TYPE') ?? 'mysql',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT')) || 3306,
          username: configService.get('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [],
          synchronize: true,
        };
      },
    }),
  ],
})
export class TypeOrmModule {}
