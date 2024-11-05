import { Controller, Get, Header, Headers, Inject, Query } from '@nestjs/common'
import { contentType } from 'mime-types'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { CookieKeys } from 'src/shared/constans/cookie'
import { HeaderKeys } from 'src/shared/constans/header'
import { ClientIP, Cookie } from 'src/shared/decorator/request'
import { GetVerifyCodeDTO } from './security.dto'
import { SecurityService } from './security.service'

@Controller('api/security')
export class SecurityController {
  @Inject(SecurityService)
  securityService: SecurityService

  @Get('verify-code')
  @Header('content-type', contentType('svg') as string)
  async getVerifyCode(@Query(VerifyPipe) query: GetVerifyCodeDTO, @Cookie(CookieKeys.ClientId) cid: string, @ClientIP() ip: string, @Headers(HeaderKeys.UserAgent) ua: string) {
    const { data, text } = this.securityService.getVerifyCode(Number(query.width), Number(query.height), Number(query.length ?? 4))

    await this.securityService.saveVerifyToDB(ip, cid, ua, text)

    return data
  }
}
