import { Body, Controller, Delete, Get, Inject, Param, Post, Query, Request, UnprocessableEntityException, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LoginRequiredGuard } from 'src/aspects/guards/login-required/login-required.guard'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { CreatePageDTO, DeletePageDTO, GetPageDTO, GetPagesDTO } from './page.dto'
import { PageService } from './page.service'

@ApiTags('页面编辑')
@Controller('api-noa/page')
export class PageController {
  @Inject(PageService)
  pageService: PageService

  @Post('create')
  @UseGuards(LoginRequiredGuard)
  async createPage(
    @Body(VerifyPipe) { templateId, type }: CreatePageDTO,
    @Request() req: Req,
  ) {
    const { userId } = req
    const page = await this.pageService.createPage(userId, type, templateId)
    return page
  }

  @Get()
  @UseGuards(LoginRequiredGuard)
  async getPages(@Query(VerifyPipe) query: GetPagesDTO, @Request() req: Req) {
    const page = Number.parseInt(query.page)
    const size = Number.parseInt(query.size)
    const pages = await this.pageService.pageRepository.find({
      where: {
        userId: req.userId,
        type: query.type,
        status: true,
      },
      skip: (page - 1) * size,
      take: size,
      select: { id: true, name: true, shared: true, template: true, description: true },
      // 按照更新时间降序排序
      order: { updatedAt: 'DESC' },
    })
    return pages
  }

  @Delete(':pageId')
  @UseGuards(LoginRequiredGuard)
  async deletePage(@Param(VerifyPipe) params: DeletePageDTO, @Request() req: Req) {
    const page = await this.pageService.pageRepository.findOneBy({
      userId: req.userId,
      id: params.pageId,
      status: true,
    })
    if (!page) {
      throw new UnprocessableEntityException('Page not exists')
    }

    // 假删除
    page.status = false
    await this.pageService.pageRepository.save(page)

    return true
  }

  @Get(':pageId')
  @UseGuards(LoginRequiredGuard)
  async getPage(@Param(VerifyPipe) param: GetPageDTO) {
    const page = await this.pageService.pageRepository.findOneBy({
      id: param.pageId,
    })
    if (!page) {
      const error = new UnprocessableEntityException('页面不存在')
      throw error
    }
    // const changesets = this.pageService.changesetRepository.find()
    return page
  }
}
