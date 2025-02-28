import { Body, Controller, Inject, Post, Response, UnauthorizedException, UnprocessableEntityException, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { ClientIP, Cookie } from 'src/aspects/decorator/request'
import { LoginRequiredGuard } from 'src/aspects/guards/login-required/login-required.guard'
import { VerifyPipe } from 'src/aspects/pipes/verify/verify.pipe'
import { SecurityService } from 'src/security/security.service'
import { EncryptService } from 'src/services/encrypt/encrypt.service'
import { CookieKeys } from 'src/shared/constans/cookie'
import { Users } from 'src/sqlite/users.entity'
import { Repository } from 'typeorm'
import { CreateUserResponseDTO, GithubLoginDTO, LoginDTO, RegisterDTO } from './user.dto'
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

  @InjectRepository(Users)
  userRepository: Repository<Users>

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
      throw new UnprocessableEntityException('用户名不存在或密码错误')
    }

    const session = this.userService.genUserSession(existsUser.id)

    res.setCookie(CookieKeys.Session, session)

    return {
      userId: existsUser.id,
      nickname: existsUser.nickname,
      session,
    }
  }

  @Post('/logout')
  @ApiOperation({
    summary: '登出',
  })
  @ApiResponse({
    status: 200,
    description: '是否登出成功',
    type: Boolean,
  })
  @UseGuards(LoginRequiredGuard)
  async logout(@Cookie(CookieKeys.Session) session: string, @Response({ passthrough: true }) res: Res) {
    // 删除Session
    res.cookie(CookieKeys.Session, '', { expires: new Date(0) })
    this.userService.destroyUserSession(session)

    // 返回401，401进行处理
    throw new UnauthorizedException('退出登录成功')
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
    const user = await this.userService.createUser(await this.userService.createNewUserInfo(body.email, void 0, body.password))
    const session = this.userService.genUserSession(user.id)

    res.setCookie(CookieKeys.Session, session)

    return {
      userId: user.id,
      nickname: user.nickname,
      session,
    }
  }

  @Post('/github-login')
  @ApiOperation({
    summary: '使用GitHub登录',
  })
  @ApiResponse({
    status: 200,
    description: '登录成功的用户信息',
    type: CreateUserResponseDTO,
  })
  async githubLogin(
    @Body(VerifyPipe) body: GithubLoginDTO,
  ) {
    const res = await this.userService.getGithubAuthResult(body.code)
    console.error(res)
    // 校验二维码
    return res
  }
}
