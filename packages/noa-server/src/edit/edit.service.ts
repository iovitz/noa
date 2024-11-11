import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Component } from 'react'
import { Changeset } from 'src/sqlite/changeset.entity'
import { Page } from 'src/sqlite/page.entity'
import { Snapshot } from 'src/sqlite/snapshot.entity'
import { DeepPartial, Repository } from 'typeorm'

@Injectable()
export class EditService {
  @InjectRepository(Page)
  pageRepository: Repository<Page>

  @InjectRepository(Component)
  compRepository: Repository<Component>

  @InjectRepository(Changeset)
  changesetRepository: Repository<Changeset>

  @InjectRepository(Snapshot)
  snapshotRepository: Repository<Snapshot>

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
