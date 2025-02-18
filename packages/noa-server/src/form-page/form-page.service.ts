import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { EncryptService } from 'src/services/encrypt/encrypt.service'
import { FormPages } from 'src/sqlite/form-pages.entity'
import { FormWidgets } from 'src/sqlite/form-widget.entity'
import { FormWidgetAttributes } from 'src/sqlite/form-widget-attributes.entity'
import { Repository } from 'typeorm'

@Injectable()
export class FormPageService {
  @Inject(EncryptService)
  encryptService: EncryptService

  @InjectRepository(FormPages)
  formPageRepository: Repository<FormPages>

  @InjectRepository(FormWidgets)
  formWidgetsRepository: Repository<FormWidgets>

  @InjectRepository(FormWidgetAttributes)
  formWidgetAttributesRepository: Repository<FormWidgetAttributes>

  @Inject(ConfigService)
  config: ConfigService

  getWidget(id: string, fileId?: string) {
    return this.formWidgetsRepository.findOneBy({
      id,
      fileId,
    })
  }

  async delWidget(existsWidget: FormWidgets) {
    const queryRunner = this.formWidgetsRepository.manager.connection.createQueryRunner()
    try {
      // 在事务中执行用户和文章的创建操作
      existsWidget.deleted = true

      // 只在widget上做软删除
      const widget = await queryRunner.manager.save(FormWidgets, [existsWidget])

      // 提交事务
      await queryRunner.commitTransaction()

      return { widget }
    }
    catch (error) {
      // 如果有错误，回滚事务
      await queryRunner.rollbackTransaction()
      throw error
    }
    finally {
      // 释放 QueryRunner
      await queryRunner.release()
    }
  }

  getPage(fileId: string) {
    return this.formPageRepository.findBy({
      id: fileId,
    })
  }

  async createWidget(fileId: string, widgetId: string, attributes: Record<string, unknown>) {
    const queryRunner = this.formWidgetsRepository.manager.connection.createQueryRunner()
    const newWidget = this.formWidgetsRepository.create({
      id: widgetId,
      fileId,
    })
    const newAttributes = Object.keys(attributes).reduce<FormWidgetAttributes[]>((result, key) => {
      if (attributes[key]) {
        result.push(this.formWidgetAttributesRepository.create({
          id: this.encryptService.genPrimaryKey('fatt'),
          widgetId,
          name: key,
          value: JSON.stringify(key),
        }))
      }
      return result
    }, [])

    try {
      return {
        widget: await queryRunner.manager.save(FormWidgets, [newWidget]),
        attributes: await queryRunner.manager.save(FormWidgetAttributes, newAttributes),
      }
    }
    catch (error) {
      // 如果有错误，回滚事务
      await queryRunner.rollbackTransaction()
      throw error
    }
    finally {
      // 释放 QueryRunner
      await queryRunner.release()
    }
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
