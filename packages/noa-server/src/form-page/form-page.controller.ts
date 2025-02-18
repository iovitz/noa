import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UnprocessableEntityException, UseGuards } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { LoginRequiredGuard } from 'src/aspects/guards/login-required/login-required.guard'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { FileApiPermission, FilePermissionGuard } from 'src/permission/guards/file-permission/file-permission.guard'
import { REQUEST_TRACER, Tracer } from 'src/services/tracer/tracer.service'
import { PermissionTypes } from 'src/shared/constans/permission'
import { In } from 'typeorm'
import { FormFileIdParamsDTO, FormWidgetParamsDTO, UpdateWidgetPropertyDTO } from './form-page.dto'
import { FormPageService } from './form-page.service'

@Controller('api-noa/form-page')
export class FormPageController {
  @Inject(REQUEST_TRACER)
  tracer: Tracer

  @Inject(FormPageService)
  formPageService: FormPageService

  @Get(':fileId/data')
  @ApiOperation({
    summary: '获表表单的快照数据',
  })
  @FileApiPermission(PermissionTypes.Readable)
  @UseGuards(LoginRequiredGuard, FilePermissionGuard)
  async getFormPage(@Param(VerifyPipe) params: FormFileIdParamsDTO) {
    const page = await this.formPageService.getFormData(params.fileId)
    return page
  }

  @Get(':fileId/widget/:widgetId')
  @ApiOperation({
    summary: '获取Widget信息',
  })
  @FileApiPermission(PermissionTypes.Readable)
  @UseGuards(LoginRequiredGuard, FilePermissionGuard)
  async getWidget(@Param(VerifyPipe) params: FormWidgetParamsDTO) {
    const widget = await this.formPageService.formWidgetsRepository.findOneBy({ id: params.widgetId })
    return widget
  }

  @Patch(':fileId/widget/:widgetId')
  @ApiOperation({
    summary: '更新Widget信息',
  })
  @FileApiPermission(PermissionTypes.Readable)
  @UseGuards(LoginRequiredGuard, FilePermissionGuard)
  async updateWidget(@Param(VerifyPipe) params: FormWidgetParamsDTO, @Body(VerifyPipe) body: UpdateWidgetPropertyDTO) {
    const dbWidget = await this.formPageService.formWidgetsRepository.findOneBy({ id: params.widgetId, fileId: params.fileId })

    if (!dbWidget) {
      throw new UnprocessableEntityException('组件不存在')
    }

    // 传入了Props才变更数据库
    if (body.attributes) {
      try {
        // 尝试序列化props，避免数据错误
        const attributes = JSON.parse(body.attributes)
        const updateFields = Object.keys(attributes)
        const dbAttributes = await this.formPageService.formWidgetAttributesRepository.findBy({
          widgetId: In(updateFields),
        })

        dbAttributes.forEach((attr) => {
          attr.value = JSON.stringify(attributes[attr.name])
        })
        await this.formPageService.formWidgetAttributesRepository.save(dbAttributes)
      }
      catch (err) {
        this.tracer.error('序列化数据异常', err)
        throw new UnprocessableEntityException('组件属性数据有误')
      }
    }
    return dbWidget
  }

  @Post(':fileId/widget/:widgetId')
  @ApiOperation({
    summary: '创建Widget',
  })
  @FileApiPermission(PermissionTypes.Editable)
  @UseGuards(LoginRequiredGuard, FilePermissionGuard)
  async createWidget(@Param(VerifyPipe) params: FormWidgetParamsDTO, @Body(VerifyPipe) body: UpdateWidgetPropertyDTO) {
    const existsWidget = await this.formPageService.getWidget(params.widgetId, params.fileId)
    if (existsWidget) {
      throw new UnprocessableEntityException('Widget is already exists!')
    }
    try {
      const attributes: Record<string, unknown> = JSON.parse(body.attributes)
      const widget = await this.formPageService.createWidget(params.fileId, params.widgetId, attributes)
      return widget
    }
    catch (error) {
      this.tracer.warn('组件数据有误', {
        error,
      })
      throw new UnprocessableEntityException('组件属性数据有误')
    }
  }

  @Delete(':fileId/widget/:widgetId')
  @ApiOperation({
    summary: '删除Widget',
  })
  @FileApiPermission(PermissionTypes.Editable)
  @UseGuards(LoginRequiredGuard, FilePermissionGuard)
  async deleteWidget(@Param(VerifyPipe) params: FormWidgetParamsDTO) {
    const existsWidget = await this.formPageService.getWidget(params.widgetId, params.fileId)
    if (!existsWidget) {
      throw new UnprocessableEntityException('Widget is not exist!')
    }
  }
}
