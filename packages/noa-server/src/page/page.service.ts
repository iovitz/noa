import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Component } from 'react'
import { Changeset } from 'src/sqlite/changeset.entity'
import { Page } from 'src/sqlite/page.entity'
import { Snapshot } from 'src/sqlite/snapshot.entity'
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

  @InjectRepository(Snapshot)
  snapshotRepository: Repository<Snapshot>

  createPage({ name, type }: DeepPartial<Page>) {
    const page = this.pageRepository.create({
      id: this.encrypt.genPrimaryKey(),
      name,
      type,
    })
    return this.pageRepository.save(page)
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
