import { Global, Module } from '@nestjs/common'
import { EncryptService } from './encrypt/encrypt.service'
import { HttpService } from './http/http.service'
import { TracerService } from './tracer/tracer.service'
import { VerifyService } from './verify/verify.service'

@Global()
@Module({
  // 全局使用的一些Service
  providers: [EncryptService, VerifyService, TracerService, HttpService],
  exports: [EncryptService, VerifyService, TracerService, HttpService],
})
export class ServicesModule {}
