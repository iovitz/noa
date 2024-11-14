import { Controller, Get, Render } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('HTML模板')
@Controller()
export class HomeController {
  @Get('noa')
  @ApiOperation({
    summary: '获取首页HTML',
  })
  @ApiResponse({
    status: 200,
    description: '登录成功的用户信息',
    type: 'html',
  })
  @Render('index')
  async getIndex() {
    return {}
  }

  @Get('noa/*')
  @Render('index')
  async getHome() {
    return {}
  }
}
