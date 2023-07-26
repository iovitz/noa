import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SocketGateway } from './socket/socket.gateway';
import { CommonModule } from './global/common.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [CommonModule, UserModule, LogModule],
  providers: [SocketGateway],
})
export class AppModule {}
