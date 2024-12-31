import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { LoginRequiredGuard } from 'src/aspects/guards/login-required/login-required.guard'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { PermissionTypes } from 'src/shared/constans/permission'
import { GetFormPageDTO } from './form-page.dto'
import { FormPageService } from './form-page.service'
import { PageApiPermission, PagePermissionGuard } from './guards/page-permission/page-permission.guard'

@Controller('api-noa/form-page')
export class FormPageController {
  @Inject(FormPageService)
  pageService: FormPageService

  @Get(':fileId')
  @ApiOperation({
    summary: '获表表单的快照数据',
  })
  @PageApiPermission(PermissionTypes.Readable)
  @UseGuards(LoginRequiredGuard, PagePermissionGuard)
  async getFormPage(@Param(VerifyPipe) param: GetFormPageDTO) {
    const page = await this.pageService.formPageRepository.findOneBy({ id: param.pageId })
    return page
  }
}
