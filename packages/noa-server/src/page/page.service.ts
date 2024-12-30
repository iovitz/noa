import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Changeset } from 'src/sqlite/changeset.entity'
import { Component } from 'src/sqlite/component.entity'
import { Page } from 'src/sqlite/page.entity'
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

  async createPage(userId: string, type: string, templateId?: string, name = '未命名页面') {
    let template: Page

    // 校验模版是否存在以及是否被分享
    if (
      !template
      // eslint-disable-next-line no-cond-assign
      || !(template = await this.pageRepository.findOneBy({ id: templateId })).template
    ) {
      return await this.pageRepository.save(this.pageRepository.create({
        id: this.encrypt.genPrimaryKey(),
        name: template?.name ?? name,
        userId,
        type,
      }))
    }

    const templateComps = await this.compRepository.findBy({
      pageId: template.id,
    })

    const newPageId = this.encrypt.genPrimaryKey()
    templateComps.forEach((item) => {
      item.pageId = newPageId
      item.id = this.encrypt.genPrimaryKey()
    })

    const [page] = await Promise.all([
      this.pageRepository.save(this.pageRepository.create({
        id: newPageId,
        name: template?.name ?? name,
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
