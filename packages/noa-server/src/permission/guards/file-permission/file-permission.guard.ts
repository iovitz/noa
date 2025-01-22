import { CanActivate, ExecutionContext, Inject, Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { get } from 'lodash'
import { PermissionService } from 'src/permission/permission.service'
import { FILE_PERMISSION_KEY } from 'src/shared/constans/meta-keys'
import { PermissionTypes } from 'src/shared/constans/permission'
import { SyncManager } from 'src/utils/sync-manager/sync-manager'
import { SYNC_MANAGER } from 'src/utils/sync-manager/sync-manager.service'
import { REQUEST_TRACER, TracerService } from 'src/utils/tracer/tracer.service'

export function FileApiPermission(permission: PermissionTypes) {
  return SetMetadata(FILE_PERMISSION_KEY, permission)
}

@Injectable()
export class FilePermissionGuard implements CanActivate {
  @Inject(PermissionService)
  permissionService: PermissionService

  @Inject(REQUEST_TRACER)
  tracer: TracerService

  @Inject(SYNC_MANAGER)
  syncManager: SyncManager

  constructor(private reflector: Reflector) {}

  async canActivate(
    context: ExecutionContext,
  ) {
    // 获取UserID
    const http = context.switchToHttp()
    const req = http.getRequest<Req>()
    const fileId = get(req, 'params.fileId', null)
    const apiPermission = this.reflector.get<string>(FILE_PERMISSION_KEY, context.getHandler())
    if (!apiPermission) {
      throw new Error('`PagePermissionGuard` must use `FileApiPermission` to set permissions')
    }
    const permission = await this.syncManager.add('GET_PAGE_PERMISSION', this.permissionService.getPagePermission(req.userId, fileId))

    // 无权限
    if (!permission.length || !permission.some(p => p >= Number(apiPermission))) {
      return false
    }

    this.tracer.log('info', JSON.stringify(permission))
    return true
  }
}
