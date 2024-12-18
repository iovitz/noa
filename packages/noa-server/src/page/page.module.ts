import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Changeset } from 'src/sqlite/changeset.entity'
import { Component } from 'src/sqlite/component.entity'
import { Page } from 'src/sqlite/page.entity'
import { Template } from 'src/sqlite/template.entity'
import { PageController } from './page.controller'
import { PageService } from './page.service'

@Module({
  imports: [TypeOrmModule.forFeature([Page, Component, Changeset, Template])],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
