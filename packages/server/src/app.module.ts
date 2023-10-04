import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/common.module';
import { LogModule } from './log/log.module';
import { WsModule } from './ws/ws.module';
import { MomentsModule } from './moments/moments.module';
import { GroupModule } from './group/group.module';
import { AuthModule } from './auth/auth.module';
import { ApplyModule } from './apply/apply.module';
import { OssModule } from './oss/oss.module';

@Module({
  imports: [
    GlobalModule,
    EventEmitterModule.forRoot(),
    WsModule,
    AuthModule,
    LogModule,
    UserModule,
    GroupModule,
    MomentsModule,
    ApplyModule,
    OssModule,
  ],
})
export class AppModule {}
