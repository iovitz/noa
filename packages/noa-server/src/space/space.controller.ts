import { Body, Controller, Delete, Get, Inject, Post, Query, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LoginRequiredGuard } from 'src/aspects/guards/login-required/login-required.guard'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { PermissionService } from 'src/permission/permission.service'
import { RequestUser } from 'src/shared/decorator/request'
import { FileExistsGuard } from './guards/file-exists/file-exists.guard'
import { CreateFileDTO, GetFilesDTO } from './space.dto'
import { SpaceService } from './space.service'

@ApiTags('文件空间')
@Controller('api-noa/space')
export class SpaceController {
  @Inject(SpaceService)
  spaceService: SpaceService

  @Inject(PermissionService)
  permissionService: PermissionService

  @Get('files-list')
  @UseGuards(LoginRequiredGuard)
  async getSpaceFiles(@Query(VerifyPipe) query: GetFilesDTO, @RequestUser() userId: string) {
    const page = Number.parseInt(query.page)
    const size = Number.parseInt(query.size)
    const fileList = await this.spaceService.spaceFileRepository.find({
      where: {
        ownerId: userId,
        type: query.type,
      },
      skip: (page - 1) * size,
      take: size,
      select: { id: true, name: true, type: true, updatedAt: true },
      // 按照更新时间降序排序
      order: { updatedAt: 'DESC' },
    })

    // 获取所有文件数量
    const total = await this.spaceService.spaceFileRepository.countBy({
      ownerId: userId,
      deleted: false,
    })

    return {
      files: fileList,
      total,
    }
  }

  @Post('create')
  @UseGuards(LoginRequiredGuard)
  async createFile(@Body(VerifyPipe) query: CreateFileDTO, @RequestUser() userId: string) {
    const file = await this.spaceService.createFile(userId, query.type, query.templateId)
    console.error(file)
    return file
  }

  @Delete(':fileId')
  @UseGuards(LoginRequiredGuard, FileExistsGuard)
  async deleteFile(@Req() req: Req) {
    const file = await req.promiseManager.get('GET_FILE')
    if (!file) {
      throw new UnprocessableEntityException('Page not exists')
    }

    // 假删除
    file.deleted = true
    await this.spaceService.spaceFileRepository.save(file)

    return true
  }
}
