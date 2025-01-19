import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FormPageService } from 'src/form-page/form-page.service'
import { SpaceFile } from 'src/sqlite/space-file.entity'
import { EncryptService } from 'src/utils/encrypt/encrypt.service'
import { Repository } from 'typeorm'

@Injectable()
export class SpaceService {
  @InjectRepository(SpaceFile)
  spaceFileRepository: Repository<SpaceFile>

  @Inject(FormPageService)
  formPageService: FormPageService

  @Inject(EncryptService)
  encryptService: EncryptService

  getFileById(fileId: string) {
    return this.spaceFileRepository.findOne({
      where: {
        id: fileId,
      },
      select: ['id', 'name', 'description', 'type', 'like', 'deleted'],
    })
  }

  async createFile(ownerId: string, type: string, templateId?: string, name?: string) {
    let template: SpaceFile
    // 如果有templateId，通过模板创建
    if (templateId) {
      template = await this.spaceFileRepository.findOneBy({
        id: templateId,
      })
      if (!template) {
        throw new BadRequestException('Template not found')
      }
    }
    const id = this.encryptService.genPrimaryKey()

    // 创建业务侧的文件
    switch (type) {
      case 'form':
        await this.formPageService.createFormPage(ownerId, id, templateId)
        break
      default:
        throw new Error('Invalid file type')
    }

    const file = this.spaceFileRepository.create({
      id,
      ownerId,
      name: name ?? (template ? `${template.name}副本` : '未命名文件'),
      type,
    })
    return this.spaceFileRepository.save(file)
  }
}
