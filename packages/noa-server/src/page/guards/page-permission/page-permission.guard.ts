import { CanActivate, ExecutionContext, Inject, Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { get } from 'lodash'
import { PermissionService } from 'src/permission/permission.service'
import { PermissionTypes } from 'src/shared/constans/permission'
import { Page } from 'src/sqlite/page.entity'
import { PageAccessPermission } from 'src/sqlite/page-permission.entity'
import { Repository } from 'typeorm'

const PAGE_PERMISSION_KEY = Symbol('PAGE_PERMISSION_KEY')

@Injectable()
export class PagePermissionGuard implements CanActivate {
  @InjectRepository(PageAccessPermission)
  pageAccessPermission: Repository<PageAccessPermission>

  @InjectRepository(Page)
  page: Repository<Page>

  @Inject(PermissionService)
  permissionService: PermissionService

  constructor(private reflector: Reflector) {}

  async canActivate(
    context: ExecutionContext,
  ) {
    // 获取UserID
    const http = context.switchToHttp()
    const req = http.getRequest<Req>()
    const pageId = get(req, 'params.pageId', null)
    const apiPermission = this.reflector.get<string>(PAGE_PERMISSION_KEY, context.getHandler())
    if (!apiPermission) {
      throw new Error('`PagePermissionGuard` must use `PageApiPermission` to set permissions')
    }
    const permission = await req.promiseManager.add('GET_PAGE_PERMISSION', this.permissionService.getPagePermission(req.userId, pageId))

    // 无权限
    if (!permission.length || !permission.some(p => p >= Number(apiPermission))) {
      return false
    }

    req.tracer.log('info', JSON.stringify(permission))
    return true
  }
}

export function PageApiPermission(permission: PermissionTypes) {
  return SetMetadata(PAGE_PERMISSION_KEY, permission)
}
