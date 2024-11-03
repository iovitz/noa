import { Controller, Get, Header, Headers, Render } from '@nestjs/common'
import { HeaderKeys } from 'src/shared/constans/header'
import { SkipFormat } from 'src/shared/decorator/skip-format'

@Controller()
export class HomeController {
  @Get()
  getIndex() {
    return 'Hello'
  }
}
