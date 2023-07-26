import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/common.module';
import { LogModule } from './log/log.module';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [GlobalModule, UserModule, LogModule, WsModule],
})
export class AppModule {}
