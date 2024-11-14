import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { CreatePageDTO, NewEditDTO } from './edit.dto'
import { EditService } from './edit.service'

@ApiTags('Edit编辑接口')
@Controller('edit')
export class EditController {
  @Inject(EditService)
  editService: EditService

  @Post('create-page')
  async createPage(@Body(VerifyPipe) { name, type }: CreatePageDTO) {
    const page = this.editService.createPage({
      name,
      type,
    })
    return page
  }

  @Post('new')
  async newChange(@Body(VerifyPipe) body: NewEditDTO) {
    // 保存CS
    await this.editService.newEdit({
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
