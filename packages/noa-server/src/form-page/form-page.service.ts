import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FormInputComponent } from 'src/sqlite/form-input-component.entity'
import { FormPage } from 'src/sqlite/form-page.entity'
import { WidgetTypes } from 'src/sqlite/widget-types.entity'
import { EncryptService } from 'src/utils/encrypt/encrypt.service'
import { Repository } from 'typeorm'

@Injectable()
export class FormPageService {
  @Inject(EncryptService)
  encryptService: EncryptService

  @InjectRepository(FormPage)
  formPageRepository: Repository<FormPage>

  @InjectRepository(FormInputComponent)
  formInputComponentRepository: Repository<FormInputComponent>

  @InjectRepository(WidgetTypes)
  widgetTypesRepository: Repository<WidgetTypes>

  getComponents(pageId: string) {
    return this.formInputComponentRepository.findBy({
      pageId,
    })
  }

  public async createFormPage(ownerId: string, fileId: string, templateId: string) {
    let template: FormPage

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
          item.id = this.encryptService.genPrimaryKey()
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

  getWidgetTypes() {
    return this.widgetTypesRepository.find()
  }
}
