import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { get } from 'lodash'
import { SyncManagerService } from 'src/services/sync-manager/sync-manager.service'
import { SpaceService } from 'src/space/space.service'

@Injectable()
export class FileExistsGuard implements CanActivate {
  @Inject(SpaceService)
  spaceService: SpaceService

  @Inject(SyncManagerService)
  syncManager: SyncManagerService

  async canActivate(
    context: ExecutionContext,
  ) {
    const http = context.switchToHttp()
    const req = http.getRequest<Req>()
    const fileId = get(req, 'params.fileId', null)
    if (!fileId) {
      throw new NotFoundException('File not exists')
    }

    const file = await this.syncManager.add(req, 'GET_FILE', this.spaceService.getFileById(fileId))

    if (!file) {
      throw new UnprocessableEntityException('File not exists')
    }
    else if (file.deleted) {
      throw new UnprocessableEntityException('File has been deleted')
    }

    return true
  }
}
