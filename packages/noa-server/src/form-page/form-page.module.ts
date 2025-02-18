import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionModule } from 'src/permission/permission.module'
import { FormPages } from 'src/sqlite/form-pages.entity'
import { FormWidgets } from 'src/sqlite/form-widget.entity'
import { FormWidgetAttributes } from 'src/sqlite/form-widget-attributes.entity'
import { FormPageController } from './form-page.controller'
import { FormPageService } from './form-page.service'

@Module({
  imports: [TypeOrmModule.forFeature([FormPages, FormWidgets, FormWidgetAttributes]), PermissionModule],
  controllers: [FormPageController],
  providers: [FormPageService],
  exports: [FormPageService],
})
export class FormPageModule {}
