import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionModule } from 'src/permission/permission.module'
import { Changeset } from 'src/sqlite/changeset.entity'
import { Component } from 'src/sqlite/component.entity'
import { Page } from 'src/sqlite/page.entity'
import { PageAccessPermission } from 'src/sqlite/page-permission.entity'
import { Template } from 'src/sqlite/template.entity'
import { PageController } from './page.controller'
import { PageService } from './page.service'

@Module({
  imports: [
    PermissionModule,
    TypeOrmModule.forFeature([Page, Component, Changeset, Template, PageAccessPermission]),
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
