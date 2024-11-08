import { Controller, Get, Render } from '@nestjs/common'

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
