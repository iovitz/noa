import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { EncryptService } from 'src/global/encrypt/encrypt.service'
import { CookieKeys } from 'src/shared/constans/cookie'
import { ClientIP, Cookie } from 'src/shared/decorator/request'
import { CreateUserDTO, CreateUserResponseDTO } from './user.dto'
import { UserService } from './user.service'

@ApiTags('登录 / 用户信息')
@Controller('api-noa/user')
export class UserController {
  @Inject(UserService)
  userService: UserService

  @Inject(EncryptService)
  encryptService: EncryptService

  @Post('/create')
  @ApiOperation({
    summary: '获取图形验证码',
  })
  @ApiResponse({
    status: 200,
    description: '登录成功的用户信息',
    type: CreateUserResponseDTO,
  })
  async createUser(@Body(VerifyPipe) body: CreateUserDTO, @ClientIP() ip: string, @Cookie(CookieKeys.ClientId) cid: string) {
    // 校验二维码
    const verifyCodeString = `${ip}`
    console.error(verifyCodeString)
    console.error(cid)

    // 创建用户
    const user = await this.userService.createUser({
      nickname: body.nickname,
      email: body.email,
      // 密码进行MD5加密
      password: await this.encryptService.encryptPassword(body.password),
    })
    return user
  }
}
