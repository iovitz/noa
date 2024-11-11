import { Module } from '@nestjs/common'
import { TracerService } from 'src/util/tracer/tracer.service'
import { SocketV1Gateway } from './socketv1.gateway'
import { SocketV1Service } from './socketv1.service'

@Module({
  providers: [SocketV1Service, SocketV1Gateway, TracerService],
})
export class SocketV1Module {}
