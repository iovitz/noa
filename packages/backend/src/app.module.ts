import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/common.module';
import { LogModule } from './log/log.module';
import { WsModule } from './ws/ws.module';
import { MomentsModule } from './moments/moments.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    GlobalModule,
    WsModule,
    LogModule,
    UserModule,
    GroupModule,
    MomentsModule,
  ],
})
export class AppModule {}
