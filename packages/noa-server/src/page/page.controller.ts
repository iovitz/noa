import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { CreatePageDTO, NewEditDTO } from './page.dto'
import { PageService } from './page.service'

@ApiTags('页面编辑')
@Controller('page')
export class PageController {
  @Inject(PageService)
  pageService: PageService

  @Post('create-page')
  async createPage(@Body(VerifyPipe) { name, type }: CreatePageDTO) {
    const page = this.pageService.createPage({
      name,
      type,
    })
    return page
  }
}
