import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EncryptService } from 'src/services/encrypt/encrypt.service'
import { FormInputComponents } from 'src/sqlite/form-input-components.entity'
import { FormPages } from 'src/sqlite/form-pages.entity'
import { Repository } from 'typeorm'

@Injectable()
export class FormPageService {
  @Inject(EncryptService)
  encryptService: EncryptService

  @InjectRepository(FormPages)
  formPageRepository: Repository<FormPages>

  @InjectRepository(FormInputComponents)
  formInputComponentRepository: Repository<FormInputComponents>

  getComponents(pageId: string) {
    return this.formInputComponentRepository.findBy({
      pageId,
    })
  }

  public async createFormPage(ownerId: string, fileId: string, templateId: string) {
    let template: FormPages

    if (templateId) {
      template = await this.formPageRepository.findOneBy({
        id: templateId,
      })
    }

    if (template) {
      // 通过模板创建页面
      const comps = await this.getComponents(template.id)
      // 更改ID
      await this.formInputComponentRepository.save(
        comps.map((item) => {
          item.pageId = fileId
          this.formInputComponentRepository.findBy({
            pageId: template.id,
          })
          return item
        }),
      )
    }

    const newFormPage = this.formPageRepository.create({
      id: fileId,
      ownerId,
    })
    return this.formPageRepository.save(newFormPage)
  }
}
