import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PermissionTypes } from 'src/shared/constans/permission'
import { FilePermission } from 'src/sqlite/file-permission.entity'
import { EncryptService } from 'src/services/encrypt/encrypt.service'
import { In, Repository } from 'typeorm'

@Injectable()
export class PermissionService {
  @Inject(EncryptService)
  encryptService: EncryptService

  @InjectRepository(FilePermission)
  filePermission: Repository<FilePermission>

  // 创建页面权限
  async initialPagePermission(userId: string, pageId: string) {
    // 创建基本权限
    await this.filePermission.save([
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

  async getPagePermission(userId: string, pageId: string) {
    return this.filePermission.findBy({
      pageId,
      userId: In([userId, 'EVERY_ONE']),
    }).then((permission) => {
      return permission.map(item => item.permission)
    })
  }
}
