import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Changeset } from 'src/sqlite/changeset.entity'
import { Component } from 'src/sqlite/component.entity'
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

  async createPage(type: string, templateId: string) {
    const template = await this.pageRepository.findOneBy({ id: templateId })

    // 校验模版是否存在以及是否被分享
    if (!template || !template.template) {
      return await this.pageRepository.save(this.pageRepository.create({
        id: this.encrypt.genPrimaryKey(),
        name: template.name,
        type,
      }))
    }

    const templateComps = await this.compRepository.findBy({
      pageId: template.id,
    })

    const newPageId = this.encrypt.genPrimaryKey()
    templateComps.forEach(item => item.pageId = newPageId)

    const [page] = await Promise.all([
      this.pageRepository.save(this.pageRepository.create({
        id: newPageId,
        name: template.name,
        type,
      })),
      this.pageRepository.save(templateComps),
    ])

    return page
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
