import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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
  formWidgetsRepository: Repository<FormWidgets>

  @Inject(ConfigService)
  config: ConfigService

  getWidget(id: string, fileId?: string) {
    return this.formWidgetsRepository.findOneBy({
      id,
      fileId,
    })
  }

  getPage(fileId: string) {
    return this.formPageRepository.findBy({
      id: fileId,
    })
  }

  createWidget(fileId: string, widgetId: string, property: string) {
    const widget = this.formWidgetsRepository.create({
      id: widgetId,
      fileId,
      property,
    })
    return this.formWidgetsRepository.save(widget)
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
      const comps = await this.formWidgetsRepository.findBy({ id: template.id })
      // 更改ID
      await this.formWidgetsRepository.save(
        comps.map((item) => {
          item.fileId = fileId
          this.formWidgetsRepository.findBy({
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

  async isWidgetNumberWillOversize(fileId: string) {
    const maxWidgetNumber = Number(this.config.get('MAX_WIDGET_NUMBER') ?? 0)
    const existsWidgetsNumber = await this.formWidgetsRepository.countBy({
      fileId,
      deleted: false,
    })
    if (existsWidgetsNumber + 1 > maxWidgetNumber) {
      return false
    }
    return true
  }
}
