import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PermissionTypes } from 'src/shared/constans/permission'
import { PagePermission } from 'src/sqlite/page-permission.entity'
import { EncryptService } from 'src/util/encrypt/encrypt.service'
import { Repository } from 'typeorm'

@Injectable()
export class PermissionService {
  @Inject(EncryptService)
  encryptService: EncryptService

  @InjectRepository(PagePermission)
  PagePermission: Repository<PagePermission>

  // 创建页面权限
  async initialPagePermission(userId: string, pageId: string) {
    // 创建基本权限
    await this.PagePermission.save([
      {
        id: this.encryptService.genPrimaryKey(),
        userId,
        pageId,
        permission: PermissionTypes.Manageable,
      },
      // 默认权限
      {
        id: this.encryptService.genPrimaryKey(),
        userId: 'EVERYONE',
        pageId,
        permission: PermissionTypes.None,
      },
    ])
    return true
  }
}
