import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SocketGateway } from './socket/socket.gateway';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, UserModule],
  providers: [SocketGateway],
})
export class AppModule {}
