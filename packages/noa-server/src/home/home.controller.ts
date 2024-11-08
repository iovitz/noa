import { Controller, Get, Header, Redirect, Render } from '@nestjs/common'
import { HeaderKeys } from 'src/shared/constans/header'
import * as superagent from 'superagent'

@Controller()
export class HomeController {
  @Get('noa')
  @Header(HeaderKeys.ContentType, 'text/html;charset=urf-8')
  async getIndex() {
    const { text } = await superagent.get('http://5yuan.bgxp.buzz/noa/index.html')
    return text
  }

  @Get('noa/*')
  @Header(HeaderKeys.ContentType, 'text/html;charset=urf-8')
  async getHome() {
    const { text } = await superagent.get('http://5yuan.bgxp.buzz/noa/index.html')
    return text
  }
}
