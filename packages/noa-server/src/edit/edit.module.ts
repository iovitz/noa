import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Changeset } from 'src/sqlite/changeset.entity'
import { Component } from 'src/sqlite/component.entity'
import { Page } from 'src/sqlite/page.entity'
import { Snapshot } from 'src/sqlite/snapshot.entity'
import { EditController } from './edit.controller'
import { EditService } from './edit.service'

@Module({
  imports: [TypeOrmModule.forFeature([Page, Component, Changeset, Snapshot])],
  controllers: [EditController],
  providers: [EditService],
})
export class EditModule {}
