import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Component } from 'react'
import { Changeset } from 'src/sqlite/changeset.entity'
import { Page } from 'src/sqlite/page.entity'
import { Template } from 'src/sqlite/template.entity'
import { EncryptService } from 'src/util/encrypt/encrypt.service'
import { DeepPartial, Repository } from 'typeorm'

@Injectable()
export class PageService {
  @Inject(EncryptService)
  encrypt: EncryptService

  @InjectRepository(Page)
  pageRepository: Repository<Page>

  @InjectRepository(Component)
  compRepository: Repository<Component>

  @InjectRepository(Changeset)
  changesetRepository: Repository<Changeset>

  @InjectRepository(Template)
  templateRepository: Repository<Template>

  async createPage(type: string, templateId: string) {
    let snapshot: string
    if (templateId) {
      // 使用指定模板
      const template = await this.templateRepository.findOneBy({ id: templateId })
      if (template) {
        snapshot = template.snapshot
      }
    }
    else {
      // 使用默认的空白模板
    }

    await this.pageRepository.save(this.pageRepository.create({
      id: this.encrypt.genPrimaryKey(),
      name: '未命名表单',
      type,
      snapshot,
    }))

    return true
  }

  newEdit({ pageId, compId, type, change, localRev }: DeepPartial<Changeset>) {
    const changeset = this.changesetRepository.create({
      pageId,
      compId,
      type,
      change,
      localRev,
    })
    return this.changesetRepository.save(changeset)
  }
}
