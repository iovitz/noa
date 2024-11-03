import { Controller, Get } from '@nestjs/common'

@Controller()
export class HomeController {
  @Get()
  getIndex() {
    return 'Hello'
  }
}
