import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { get } from 'lodash'
import { SpaceService } from 'src/space/space.service'

@Injectable()
export class FileExistsGuard implements CanActivate {
  @Inject(SpaceService)
  spaceService: SpaceService

  async canActivate(
    context: ExecutionContext,
  ) {
    const http = context.switchToHttp()
    const req = http.getRequest<Req>()
    const fileId = get(req, 'params.fileId', null)
    if (!fileId) {
      throw new NotFoundException('File not exists')
    }

    const file = await req.syncManager.add('GET_FILE', this.spaceService.getFileById(fileId))

    if (!file) {
      throw new UnprocessableEntityException('File not exists')
    }
    else if (file.deleted) {
      throw new UnprocessableEntityException('File has been deleted')
    }

    return true
  }
}
