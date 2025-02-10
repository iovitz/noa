import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
import stringify from 'safe-stable-stringify'
import { REDIS_CLIENT } from 'src/redis/redis.module'
import { EncryptService } from 'src/services/encrypt/encrypt.service'
import { IoService } from 'src/services/io/io/io.service'
import { OAuth } from 'src/sqlite/oauth.entity'
import { DeepPartial, Repository } from 'typeorm'
import { v4 } from 'uuid'
import { Users } from '../sqlite/users.entity'
import { namePart1, namePart2 } from './user.const'

@Injectable()
export class UserService {
  @InjectRepository(Users)
  userRepository: Repository<Users>

  @InjectRepository(OAuth)
  oauthRepository: Repository<OAuth>

  @Inject(EncryptService)
  encryptService: EncryptService

  @Inject(REDIS_CLIENT)
  redis: Redis

  @Inject(IoService)
  io: IoService

  @Inject(ConfigService)
  config: ConfigService

  async createNewUserInfo(email: string, nickname?: string, password?: string) {
    return {
      id: this.encryptService.genPrimaryKey(),
      nickname: nickname ?? this.genRandomUsername(),
      email,
      // 密码进行MD5加密
      password: password ? await this.encryptService.encryptMd5(password) : void 0,
    }
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    })
  }

  genUserSession(id: string) {
    const session = v4()

    // 存入Redis
    this.redis.set(`session-${session}`, stringify({
      id,
    }))

    return session
  }

  destroyUserSession(session: string) {
    this.redis.del(`session-${session}`)
    return true
  }

  createUser(userData: DeepPartial<Users>) {
    const user = this.userRepository.create({
      ...userData,
    })
    return this.userRepository.save(user)
  }

  genRandomUsername() {
    const len1 = namePart1.length
    const len2 = namePart2.length
    const part1 = namePart1[Math.floor(Math.random() * len1)]
    const part2 = namePart2[Math.floor(Math.random() * len2)]
    const part3 = `${Math.floor(Math.random() * 100)}`.padStart(2, '0')
    return `${part1}的${part2}${part3}`
  }

  async getGithubAuthResult(code: string) {
    const res = await this.io.post('https://github.com/login/oauth/access_token', {
      code,
      client_id: this.config.get('GITHUB_CLIENT_ID'),
      client_secret: this.config.get('GITHUB_CLIENT_SECRET'),
    })
    if (res.body.error) {
      throw new UnprocessableEntityException(res.body)
    }

    const token = res.body.access_token
    const githubUser = (await this.io.client.get('https://api.github.com/user').set('Authorization', `Bearer ${token}`).set('User-Agent', 'Noa/1.0')).body
    const email = githubUser.email
    const existsOauthRecord = await this.oauthRepository.findOneBy({
      platform: 'github',
      platformId: githubUser.id,
    })
    if (existsOauthRecord) {
      const user = await this.userRepository.findOneBy({ id: existsOauthRecord.userId })
      return user
    }
    else {
      // TODO：可能和email已经被注册过了，此时会无法注册，需要处理
      const newUserRecord = await this.createNewUserInfo(email, githubUser.name)
      console.error(newUserRecord)

      const newOauthRecord = this.oauthRepository.create({
        id: this.encryptService.genPrimaryKey(),
        userId: newUserRecord.id,
        platform: 'github',
        platformId: githubUser.id,
      })
      await this.oauthRepository.save(newOauthRecord)

      const user = await this.createUser(newUserRecord)
      await this.oauthRepository.save(user)
      return user
    }
  }
}
