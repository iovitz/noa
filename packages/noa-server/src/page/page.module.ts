import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Component } from 'react'
import { Changeset } from 'src/sqlite/changeset.entity'
import { Page } from 'src/sqlite/page.entity'
import { Snapshot } from 'src/sqlite/snapshot.entity'
import { PageController } from './page.controller'
import { PageService } from './page.service'

@Module({
  imports: [TypeOrmModule.forFeature([Page, Component, Changeset, Snapshot])],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
