import { Body, Controller, Get, Header, Param, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { TracerService } from 'src/services/tracer/tracer.service'
import { Tracer } from 'src/shared/decorator/request'
import { createUserDTO, getUserDTO, getUsersDTO } from './user.dto'
import { UserService } from './user.service'

@ApiTags('User Module')
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/list')
  @ApiOperation({
    description: '用户注册',
  })
  @ApiResponse({
    status: 200,
    description: '注册成功的用户信息',
  })
  @Header('name', 'zs')
  async getUsers(@Query() query: getUsersDTO, @Tracer() tracer: TracerService) {
    const users = await this.userService.getUserList(
      Number(query.page ?? 1),
      Number(query.size ?? 10),
    )
    tracer.error('信息中携带Error', new Error('123123'))
    tracer.warn('打印警告')
    tracer.log('普通信息')
    return users
  }

  @Get('/:id')
  @ApiOperation({
    description: '用户注册',
  })
  @ApiResponse({
    status: 200,
    description: '注册成功的用户信息',
  })
  async getUser(@Param() param: getUserDTO) {
    const user = await this.userService.getUserById(Number(param.id))
    return user
  }

  @Post('/create')
  async createUser(@Body(VerifyPipe) body: createUserDTO) {
    const user = await this.userService.createUser(body.name, body.age)
    return user
  }
}
