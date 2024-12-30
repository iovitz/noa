import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { get } from 'lodash'
import { PermissionTypes } from 'src/shared/constans/permission'
import { Page } from 'src/sqlite/page.entity'
import { PagePermission } from 'src/sqlite/page-permission.entity'
import { In, Repository } from 'typeorm'

@Injectable()
export class PagePermissionGuard implements CanActivate {
  @InjectRepository(PagePermission)
  pagePermission: Repository<PagePermission>

  @InjectRepository(Page)
  page: Repository<Page>

  async canActivate(
    context: ExecutionContext,
  ) {
    // 获取UserID
    const http = context.switchToHttp()
    const req = http.getRequest<Req>()
    const pageId = get(req, 'params.pageId', null)
    if (pageId) {
      const permission = await this.pagePermission.findBy({
        pageId,
        userId: In([req.userId, 'EVERY_ONE']),
      })
      // 无权限
      if (!permission.length || !permission.some(item => item.permission > PermissionTypes.None)) {
        return false
      }

      req.tracer.log('info', JSON.stringify(permission))
      return true
    }
    return false
  }
}
