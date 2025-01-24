import { Controller, Get, Header, Inject, Query } from '@nestjs/common'
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger'
import { contentType } from 'mime-types'
import { ClientID, ClientIP } from 'src/aspects/decorator/request'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { EncryptService } from 'src/services/encrypt/encrypt.service'
import { REQUEST_TRACER, Tracer } from 'src/services/tracer/tracer.service'
import { GetVerifyCodeDTO } from './security.dto'
import { SecurityService } from './security.service'

@ApiTags('认证/安全')
@Controller('api-noa/security')
export class SecurityController {
  @Inject(SecurityService)
  securityService: SecurityService

  @Inject(EncryptService)
  encryptService: EncryptService

  @Inject(REQUEST_TRACER)
  tracer: Tracer

  @ApiOperation({
    summary: '获取图形验证码',
    description: '通过参数获取验证码',
  })
  @ApiResponse({
    status: 200,
    description: 'SVG图片的内容',
    example: 'CODE',
  })
  @ApiProduces(contentType('svg') as string)
  @Get('verify-code')
  @Header('content-type', contentType('svg') as string)
  async getVerifyCode(@Query(VerifyPipe) query: GetVerifyCodeDTO, @ClientID() cid: string, @ClientIP() ip: string) {
    const { data, text } = await this.securityService.getVerifyCode(
      await this.encryptService.encryptMd5(`verify-code-${ip}-${cid}-${query.type}`),
      Number(query.width),
      Number(query.height),
      Number(query.length ?? 4),
    )
    this.tracer.log('get verify code', { code: text })
    return data
  }
}
