import { Global, Module } from '@nestjs/common'
import { EncryptService } from './encrypt/encrypt.service'
import { HttpService } from './http/http.service'
import { TracerService } from './tracer/tracer.service'

@Global()
@Module({
  // 全局使用的一些Service
  providers: [EncryptService, TracerService, HttpService],
  exports: [EncryptService, TracerService, HttpService],
})
export class GlobalModule {}
