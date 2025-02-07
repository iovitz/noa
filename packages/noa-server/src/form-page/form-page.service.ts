import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EncryptService } from 'src/services/encrypt/encrypt.service'
import { FormPages } from 'src/sqlite/form-pages.entity'
import { FormWidgets } from 'src/sqlite/form-widget.entity'
import { Repository } from 'typeorm'

@Injectable()
export class FormPageService {
  @Inject(EncryptService)
  encryptService: EncryptService

  @InjectRepository(FormPages)
  formPageRepository: Repository<FormPages>

  @InjectRepository(FormWidgets)
  formWidgets: Repository<FormWidgets>

  getWidget(id: string, fileId?: string) {
    return this.formWidgets.findOneBy({
      id,
      fileId,
    })
  }

  getPage(fileId: string) {
    return this.formPageRepository.findBy({
      id: fileId,
    })
  }

  createWidget(fileId: string, widgetId: string, type: string, props: string) {
    const widget = this.formWidgets.create({
      id: widgetId,
      fileId,
      type,
      props,
    })
    return this.formWidgets.save(widget)
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
      const comps = await this.formWidgets.findBy({ id: template.id })
      // 更改ID
      await this.formWidgets.save(
        comps.map((item) => {
          item.fileId = fileId
          this.formWidgets.findBy({
            fileId: template.id,
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
