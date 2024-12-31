import { Body, Controller, Inject, Post, Response, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
import * as stringify from 'json-stringify-safe'
import { ClientIP, Cookie } from 'src/aspects/decorator/request'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { REDIS_CLIENT } from 'src/redis/redis.module'
import { SecurityService } from 'src/security/security.service'
import { CookieKeys } from 'src/shared/constans/cookie'
import { User } from 'src/sqlite/user.entity'
import { EncryptService } from 'src/util/encrypt/encrypt.service'
import { Repository } from 'typeorm'
import { v4 } from 'uuid'
import { CreateUserResponseDTO, LoginDTO, RegisterDTO } from './user.dto'
import { UserService } from './user.service'

@ApiTags('登录 / 用户信息')
@Controller('api-noa/user')
export class UserController {
  @Inject(UserService)
  userService: UserService

  @Inject(EncryptService)
  encryptService: EncryptService

  @Inject(REDIS_CLIENT)
  redis: Redis

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
  async login(
    @Body(VerifyPipe) body: LoginDTO,
    @ClientIP() ip: string,
    @Cookie(CookieKeys.ClientId) cid: string,
    @Response({ passthrough: true }) res: Res,
  ) {
    // 校验二维码
    const verifyCodeCorrect = await this.securityService.checkVerifyCode(
      await this.encryptService.encryptMd5(`verify-code-${ip}-${cid}-login`),
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

    const session = v4()

    // 存入Redis
    this.redis.set(`session-${session}`, stringify({
      id: existsUser.id,
    }))

    res.setCookie(CookieKeys.Session, session)

    return {
      userId: existsUser.id,
      nickname: existsUser.nickname,
      session,
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
  async register(
    @Body(VerifyPipe) body: RegisterDTO,
    @ClientIP() ip: string,
    @Cookie(CookieKeys.ClientId) cid: string,
    @Response({ passthrough: true }) res: Res,
  ) {
    // 校验二维码
    const verifyCodeCorrect = await this.securityService.checkVerifyCode(
      await this.encryptService.encryptMd5(`verify-code-${ip}-${cid}-register`),
      body.code,
    )
    if (!verifyCodeCorrect) {
      throw new UnprocessableEntityException('验证码错误')
    }

    const existsUser = await this.userRepository.findOneBy({
      email: body.email,
    })

    if (existsUser) {
      throw new UnprocessableEntityException('邮箱已被注册')
    }

    // 创建用户
    const user = await this.userService.createUser({
      id: this.encryptService.genPrimaryKey(),
      nickname: this.userService.genRandomUsername(),
      email: body.email,
      // 密码进行MD5加密
      password: await this.encryptService.encryptMd5(body.password),
    })

    const session = v4()

    // 存入Redis
    this.redis.set(`session-${session}`, stringify({
      id: user.id,
    }))

    res.setCookie(CookieKeys.Session, session)

    return {
      userId: user.id,
      nickname: user.nickname,
      session,
    }
  }
}
