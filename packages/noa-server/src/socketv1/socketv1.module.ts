import { Module } from '@nestjs/common'
import { SocketV1Gateway } from './socketv1.gateway'
import { SocketV1Service } from './socketv1.service'

@Module({
  providers: [SocketV1Service, SocketV1Gateway],
})
export class SocketV1Module {}
