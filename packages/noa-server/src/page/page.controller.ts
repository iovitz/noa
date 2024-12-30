import { Body, Controller, Delete, Get, Inject, Param, Post, Query, Request, UnprocessableEntityException, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginRequiredGuard } from 'src/aspects/guards/login-required/login-required.guard'
import { PagePermissionGuard } from 'src/aspects/guards/page-permission/page-permission.guard'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { PermissionService } from 'src/permission/permission.service'
import { CreatePageDTO, DeletePageDTO, GetPageDTO, GetPagesDTO } from './page.dto'
import { PageService } from './page.service'

@ApiTags('页面编辑')
@Controller('api-noa/page')
export class PageController {
  @Inject(PageService)
  pageService: PageService

  @Inject(PermissionService)
  permissionService: PermissionService

  @Post('create')
  @UseGuards(LoginRequiredGuard)
  @ApiOperation({
    summary: '创建新页面',
  })
  async createPage(
    @Body(VerifyPipe) { templateId, type, name }: CreatePageDTO,
    @Request() { userId }: Req,
  ) {
    const page = await this.pageService.createPage(userId, type, templateId, name)
    // 初始化Owner的权限
    await this.permissionService.initialPagePermission(userId, page.id)
    return page
  }

  @Get()
  @UseGuards(LoginRequiredGuard)
  @ApiOperation({
    summary: '获取页面列表',
  })
  async getPages(@Query(VerifyPipe) query: GetPagesDTO, @Request() req: Req) {
    const page = Number.parseInt(query.page)
    const size = Number.parseInt(query.size)
    const pages = await this.pageService.pageRepository.find({
      where: {
        userId: req.userId,
        type: query.type,
        deleted: false,
      },
      skip: (page - 1) * size,
      take: size,
      select: { id: true, name: true, shared: true, template: true, description: true, type: true, like: true },
      // 按照更新时间降序排序
      order: { updatedAt: 'DESC' },
    })
    const total = await this.pageService.pageRepository.countBy({
      userId: req.userId,
      deleted: false,
    })
    return { pages, total }
  }

  @Delete(':pageId')
  @UseGuards(LoginRequiredGuard)
  @ApiOperation({
    summary: '获取单个页面的快照',
  })
  async deletePage(@Param(VerifyPipe) _params: DeletePageDTO, @Request() _req: Req) {
    const page = await this.pageService.pageRepository.findOneBy({
    })
    if (!page) {
      throw new UnprocessableEntityException('Page not exists')
    }

    // 假删除
    page.deleted = true
    await this.pageService.pageRepository.save(page)

    return true
  }

  @Get(':pageId')
  @UseGuards(LoginRequiredGuard, PagePermissionGuard)
  @ApiOperation({
    summary: '获取指定页面的数据',
  })
  async getPage(@Param(VerifyPipe) param: GetPageDTO) {
    const page = await this.pageService.pageRepository.findOneBy({
      id: param.pageId,
      deleted: false,
    })
    if (!page) {
      const error = new UnprocessableEntityException('页面不存在')
      throw error
    }
    // const changesets = this.pageService.changesetRepository.find()
    return page
  }
}
