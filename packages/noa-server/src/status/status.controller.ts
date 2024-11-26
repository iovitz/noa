import { Controller, Get, Render } from '@nestjs/common'

@Controller('api-noa/status')
export class StatusController {
  @Get()
  getStatus() {
    return 'Hello, world'
  }
}
