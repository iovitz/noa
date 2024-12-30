import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { get } from 'lodash'
import { PageService } from 'src/page/page.service'

@Injectable()
export class PageExistsGuard implements CanActivate {
  @Inject(PageService)
  pageService: PageService

  async canActivate(
    context: ExecutionContext,
  ) {
    // 获取UserID
    const http = context.switchToHttp()
    const req = http.getRequest<Req>()
    const pageId = get(req, 'params.pageId', null)
    if (!pageId) {
      throw new NotFoundException('Page not exists')
    }
    const page = await req.promiseManager.add('GET_PAGE', this.pageService.getPage(pageId))
    if (!page) {
      throw new NotFoundException('Page not exists')
    }
    return true
  }
}
