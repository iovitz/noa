import { Controller, Get, Render } from '@nestjs/common'

@Controller('api-noa/status')
export class StatusController {
  @Get()
  @Render('io')
  getStatus() {
    return 'Hello, world'
  }
}
