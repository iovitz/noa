import { Body, Controller, Get, Inject, Param, Post, UnprocessableEntityException, UseGuards } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { LoginRequiredGuard } from 'src/aspects/guards/login-required/login-required.guard'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { FileApiPermission, FilePermissionGuard } from 'src/permission/guards/file-permission/file-permission.guard'
import { PermissionTypes } from 'src/shared/constans/permission'
import { CreateWidgetDTO, FormPageQueryDTO, GetWidgetInfoDTO } from './form-page.dto'
import { FormPageService } from './form-page.service'

@Controller('api-noa/form-page')
export class FormPageController {
  @Inject(FormPageService)
  formPageService: FormPageService

  @Get(':fileId/snapshot')
  @ApiOperation({
    summary: '获表表单的快照数据',
  })
  @FileApiPermission(PermissionTypes.Readable)
  @UseGuards(LoginRequiredGuard, FilePermissionGuard)
  async getFormPage(@Param(VerifyPipe) param: FormPageQueryDTO) {
    const page = await this.formPageService.formPageRepository.findOneBy({ id: param.fileId })
    return page
  }

  @Get(':fileId/widget/:recordId')
  @ApiOperation({
    summary: '获取Widget信息',
  })
  @FileApiPermission(PermissionTypes.Readable)
  @UseGuards(LoginRequiredGuard, FilePermissionGuard)
  async getWidget(@Param(VerifyPipe) param: GetWidgetInfoDTO) {
    const page = await this.formPageService.formPageRepository.findOneBy({ id: param.type })
    return page
  }

  @Post(':fileId/widget')
  @ApiOperation({
    summary: '创建Widget',
  })
  @FileApiPermission(PermissionTypes.Editable)
  @UseGuards(LoginRequiredGuard, FilePermissionGuard)
  async createWidget(@Param(VerifyPipe) param: FormPageQueryDTO, @Body(VerifyPipe) body: CreateWidgetDTO) {
    const existsWidget = await this.formPageService.getWidget(body.widgetId, param.fileId)
    if (existsWidget) {
      throw new UnprocessableEntityException('Widget is already exists!')
    }
    const widget = await this.formPageService.createWidget(param.fileId, body.widgetId, body.type, JSON.stringify(body.props ?? {}))
    return widget
  }
}
