import { Controller, Get, Header, Render } from '@nestjs/common'
import { HeaderKeys } from 'src/shared/constans/header'
import * as superagent from 'superagent'

@Controller()
export class HomeController {
  @Get('noa')
  @Render('index')
  async getIndex() {
    return {}
  }

  @Get('noa/*')
  @Render('index')
  async getHome() {
    return {}
  }
}
