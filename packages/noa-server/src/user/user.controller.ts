import { Body, Controller, Headers, Inject, Post, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { SecurityService } from 'src/security/security.service'
import { CookieKeys } from 'src/shared/constans/cookie'
import { HeaderKeys } from 'src/shared/constans/header'
import { ClientIP, Cookie } from 'src/shared/decorator/request'
import { User } from 'src/sqlite/user.entity'
import { EncryptService } from 'src/util/encrypt/encrypt.service'
import { Repository } from 'typeorm'
import { CreateUserResponseDTO, LoginDTO, RegisterDTO } from './user.dto'
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

  @InjectRepository(User)
  userRepository: Repository<User>

  @Post('/login')
  @ApiOperation({
    summary: '使用账号密码登录',
  })
  @ApiResponse({
    status: 200,
    description: '登录成功的用户信息',
    type: CreateUserResponseDTO,
  })
  async login(@Body(VerifyPipe) body: LoginDTO, @ClientIP() ip: string, @Headers(HeaderKeys.UserAgent) ua: string, @Cookie(CookieKeys.ClientId) cid: string) {
    // 校验二维码
    const verifyCodeCorrect = await this.securityService.checkVerifyCode(
      await this.encryptService.encryptMd5(`verify-code-${ip}-${ua}-${cid}-login`),
      body.code,
    )
    if (!verifyCodeCorrect) {
      throw new UnprocessableEntityException('验证码错误')
    }
    const existsUser = await this.userRepository.findOneBy({
      email: body.email,
    })

    if (!existsUser || await this.encryptService.encryptMd5(body.password) !== existsUser.password) {
      throw new UnauthorizedException('用户名不存在或密码错误')
    }

    return {
      id: existsUser.nickname,
      nickname: existsUser.nickname,
      session: '123123',
    }
  }

  @Post('/register')
  @ApiOperation({
    summary: '创建用户',
  })
  @ApiResponse({
    status: 200,
    description: '登录成功的用户信息',
    type: CreateUserResponseDTO,
  })
  async register(@Body(VerifyPipe) body: RegisterDTO, @ClientIP() ip: string, @Headers(HeaderKeys.UserAgent) ua: string, @Cookie(CookieKeys.ClientId) cid: string) {
    // 校验二维码
    const verifyCodeCorrect = await this.securityService.checkVerifyCode(
      await this.encryptService.encryptMd5(`verify-code-${ip}-${ua}-${cid}-register`),
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
