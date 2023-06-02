import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SocketGateway } from './socket/socket.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
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
    UserModule,
  ],
  providers: [SocketGateway],
})
export class AppModule {}
// UEd5G3aY9c1fp61XxI
