import { Controller, Get } from '@nestjs/common'
import { CookieKeys } from 'src/shared/constans/cookie'
import { Cookie } from 'src/shared/decorator/request'

@Controller()
export class HomeController {
  @Get()
  getIndex(@Cookie(CookieKeys.ClientId) cid: string) {
    return cid
  }
}
