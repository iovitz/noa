import { Body, Controller, Delete, Get, Inject, Patch, Post, Query, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RequestUser } from 'src/aspects/decorator/request'
import { LoginRequiredGuard } from 'src/aspects/guards/login-required/login-required.guard'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { FileApiPermission, FilePermissionGuard } from 'src/permission/guards/file-permission/file-permission.guard'
import { PermissionService } from 'src/permission/permission.service'
import { PermissionTypes } from 'src/shared/constans/permission'
import { FileIDQueryDTO } from 'src/shared/dto/dto'
import { FileExistsGuard } from './guards/file-exists/file-exists.guard'
import { CreateFileDTO, GetFilesDTO, PatchFileDTO } from './space.dto'
import { SpaceService } from './space.service'

@ApiTags('文件空间')
@Controller('api-noa/space')
@UseGuards(LoginRequiredGuard)
export class SpaceController {
  @Inject(SpaceService)
  spaceService: SpaceService

  @Inject(PermissionService)
  permissionService: PermissionService

  @Get('file-list')
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
  @UseGuards()
  async createFile(@Body(VerifyPipe) query: CreateFileDTO, @RequestUser() userId: string) {
    const file = await this.spaceService.createFile(userId, query.type, query.templateId)
    await this.permissionService.initialPagePermission(userId, file.id)
    return file
  }

  @Patch('update')
  @UseGuards(FileExistsGuard, FilePermissionGuard)
  async updateFileInfo(@Query(VerifyPipe) query: FileIDQueryDTO, @Body(VerifyPipe) body: PatchFileDTO) {
    const file = await this.spaceService.spaceFileRepository.findOneBy({
      id: query.fileId,
    })
    file.name = body.name
    await this.spaceService.spaceFileRepository.save(file)
    return file
  }

  @Delete(':fileId')
  @FileApiPermission(PermissionTypes.Manageable)
  @UseGuards(FileExistsGuard, FilePermissionGuard)
  async deleteFile(@Req() req: Req) {
    const file = await req.promiseManager.get('GET_FILE')

    file.deleted = true
    await this.spaceService.spaceFileRepository.save(file)

    return true
  }
}
