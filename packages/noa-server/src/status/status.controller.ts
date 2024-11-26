import { Controller, Get } from '@nestjs/common'

@Controller('api-noa/status')
export class StatusController {
  @Get()
  getStatus() {
    return 'Hello, world'
  }
}
