import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionModule } from 'src/permission/permission.module'
import { FormInputComponents } from 'src/sqlite/form-input-components.entity'
import { FormPages } from 'src/sqlite/form-pages.entity'
import { FormPageController } from './form-page.controller'
import { FormPageService } from './form-page.service'

@Module({
  imports: [TypeOrmModule.forFeature([FormPages, FormInputComponents]), PermissionModule],
  controllers: [FormPageController],
  providers: [FormPageService],
  exports: [FormPageService],
})
export class FormPageModule {}
