import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionModule } from 'src/permission/permission.module'
import { FormInputComponent } from 'src/sqlite/form-input-component.entity'
import { FormPage } from 'src/sqlite/form-page.entity'
import { FormPageController } from './form-page.controller'
import { FormPageService } from './form-page.service'

@Module({
  imports: [TypeOrmModule.forFeature([FormPage, FormInputComponent]), PermissionModule],
  controllers: [FormPageController],
  providers: [FormPageService],
  exports: [FormPageService],
})
export class FormPageModule {}
