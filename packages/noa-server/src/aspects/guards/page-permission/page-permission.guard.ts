import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { get } from 'lodash'
import { Permission } from 'src/sqlite/permission.entity'
import { RolePermission } from 'src/sqlite/role-permission.entity'
import { UserRole } from 'src/sqlite/user-role.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PagePermissionGuard implements CanActivate {
  @InjectRepository(UserRole)
  userRole: Repository<UserRole>

  @InjectRepository(RolePermission)
  userPermission: Repository<RolePermission>

  @InjectRepository(Permission)
  permission: Repository<Permission>

  async canActivate(
    context: ExecutionContext,
  ) {
    // 获取UserID
    const http = context.switchToHttp()
    const req = http.getRequest<Req>()
    const pageId = get(req, 'params.pageId', null)
    if (pageId) {
      const role = await this.userRole.findOneBy({
        userId: req.userId,
        entityType: 'page',
        entityId: pageId,
      })
      req.tracer.log('info', JSON.stringify(role))
      return true
    }
    return false
  }
}
