import { Body, Controller, Post } from '@nestjs/common'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { NewEditDTO } from './edit.dto'

@Controller('edit')
export class EditController {
  @Post('new')
  newChange(@Body(VerifyPipe) body: NewEditDTO) {
    // const { pageId, cmpId, type, change, localRev } = body
    return {
      rev: 30,
      data: !!body,
    }
  }
}
