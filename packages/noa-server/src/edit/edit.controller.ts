import { Body, Controller, Inject, Post } from '@nestjs/common'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { NewEditDTO } from './edit.dto'
import { EditService } from './edit.service'

@Controller('edit')
export class EditController {
  @Inject(EditService)
  editService: EditService

  @Post('new')
  async newChange(@Body(VerifyPipe) body: NewEditDTO) {
    // 保存CS
    await this.editService.newEdit({
      pageId: body.pageId,
      compId: body.compId,
      change: body.change,
    })
    // 推送最新版本和脏区
    return {
      rev: 30,
      data: !!body,
    }
  }
}
