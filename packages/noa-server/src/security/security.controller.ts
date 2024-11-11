import { Controller, Get, Header, Headers, Inject, Query } from '@nestjs/common'
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger'
import { contentType } from 'mime-types'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { HeaderKeys } from 'src/shared/constans/header'
import { ClientID, ClientIP } from 'src/shared/decorator/request'
import { EncryptService } from 'src/util/encrypt/encrypt.service'
import { GetVerifyCodeDTO } from './security.dto'
import { SecurityService } from './security.service'

@ApiTags('认证/安全')
@Controller('api-noa/security')
export class SecurityController {
  @Inject(SecurityService)
  securityService: SecurityService

  @Inject(EncryptService)
  encryptService: EncryptService

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
  async getVerifyCode(@Query(VerifyPipe) query: GetVerifyCodeDTO, @ClientID() cid: string, @ClientIP() ip: string, @Headers(HeaderKeys.UserAgent) ua: string) {
    const data = this.securityService.getVerifyCode(
      await this.encryptService.encryptMd5(`${ip}-${ua}-${cid}`),
      Number(query.width),
      Number(query.height),
      Number(query.length ?? 4),
    )

    return data
  }
}
