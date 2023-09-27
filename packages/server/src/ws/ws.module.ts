import { Module } from '@nestjs/common';
import { Wsv1Module } from './wsv1/wsv1.module';

@Module({
  imports: [Wsv1Module],
})
export class WsModule {}
