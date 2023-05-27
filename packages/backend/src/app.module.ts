import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SocketGateway } from './socket/socket.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 环境变量配置
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      renderPath: '/index.html',
      exclude: ['/api/(.*)'],
    }),
    PrismaModule,
    UserModule,
  ],
  providers: [SocketGateway, PrismaModule],
})
export class AppModule {}
