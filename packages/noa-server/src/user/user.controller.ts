import { Body, Controller, Headers, Inject, Post, UnprocessableEntityException } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { SecurityService } from 'src/security/security.service'
import { CookieKeys } from 'src/shared/constans/cookie'
import { HeaderKeys } from 'src/shared/constans/header'
import { ClientIP, Cookie } from 'src/shared/decorator/request'
import { EncryptService } from 'src/util/encrypt/encrypt.service'
import { CreateUserDTO, CreateUserResponseDTO } from './user.dto'
import { UserService } from './user.service'

@ApiTags('登录 / 用户信息')
@Controller('api-noa/user')
export class UserController {
  @Inject(UserService)
  userService: UserService

  @Inject(EncryptService)
  encryptService: EncryptService

  @Inject(SecurityService)
  securityService: SecurityService

  @Post('/create')
  @ApiOperation({
    summary: '获取图形验证码',
  })
  @ApiResponse({
    status: 200,
    description: '登录成功的用户信息',
    type: CreateUserResponseDTO,
  })
  async createUser(@Body(VerifyPipe) body: CreateUserDTO, @ClientIP() ip: string, @Headers(HeaderKeys.UserAgent) ua: string, @Cookie(CookieKeys.ClientId) cid: string) {
    // 校验二维码
    const verifyCodeCorrect = await this.securityService.checkVerifyCode(
      await this.encryptService.encryptMd5(`${ip}-${ua}-${cid}`),
      body.code,
    )
    if (!verifyCodeCorrect) {
      throw new UnprocessableEntityException('验证码错误')
    }

    // 创建用户
    const user = await this.userService.createUser({
      nickname: body.nickname,
      email: body.email,
      // 密码进行MD5加密
      password: await this.encryptService.encryptMd5(body.password),
    })
    return user
  }
}
