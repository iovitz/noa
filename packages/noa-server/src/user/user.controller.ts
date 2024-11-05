import { Body, Controller, Get, Header, Param, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { CreateUserDTO, CreateUserResponseDTO } from './user.dto'
import { UserService } from './user.service'

@ApiTags('User Module')
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  @ApiOperation({
    description: '创建用户',
  })
  @ApiResponse({
    status: 200,
    description: '登录成功的用户信息',
    type: CreateUserResponseDTO,
  })
  async createUser(@Body(VerifyPipe) body: CreateUserDTO) {
    // 校验二维码

    // 加密密码

    // 创建用户
    const user = await this.userService.createUser({
      name: body.name,
      phone: body.phone,
      password: body.password,
    })
    return user
  }
}
