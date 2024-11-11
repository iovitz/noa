import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EncryptService } from './encrypt/encrypt.service'
import { HttpService } from './http/http.service'
import { TracerService } from './tracer/tracer.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
      // 开发环境才加载配置数据
      ['production'].includes(process.env.NODE_ENV) ? [] : ['.env.development'],
      load: [
        // 可以加载远程配置
        async () => {
          const isProd = process.env.NODE_ENV === 'production'

          return {
            isProd,
          }
        },
      ],
    }),
  ],
  // 全局使用的一些Service
  providers: [EncryptService, TracerService, HttpService],
  exports: [EncryptService, TracerService, HttpService],
})
export class UtilModule {}
