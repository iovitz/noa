import { Body, Controller, Delete, Get, Inject, Param, Post, UnprocessableEntityException } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { CreatePageDTO, GetPageDTO } from './page.dto'
import { PageService } from './page.service'

@ApiTags('页面编辑')
@Controller('api-noa/page')
export class PageController {
  @Inject(PageService)
  pageService: PageService

  @Post('create')
  async createPage(@Body(VerifyPipe) { templateId, type }: CreatePageDTO) {
    const page = this.pageService.createPage(type, templateId)
    return page
  }

  @Get()
  async getAllPage() {

  }

  @Delete(':pageId')
  async deletePage() {

  }

  @Get(':pageId')
  async getPage(@Param(VerifyPipe) param: GetPageDTO) {
    const page = await this.pageService.pageRepository.findOneBy({
      id: param.pageId,
    })
    if (!page) {
      const error = new UnprocessableEntityException('验证码错误')
      throw error
    }
    // const changesets = this.pageService.changesetRepository.find()
    return page
  }
}
