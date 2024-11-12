import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
import { REDIS_CLIENT } from 'src/redis/redis.module'
import * as svgCaptcha from 'svg-captcha'
import { Repository } from 'typeorm'
import { VerifyCode } from '../sqlite/verify-code.entity'

@Injectable()
export class SecurityService {
  @Inject(REDIS_CLIENT)
  redis: Redis

  @InjectRepository(VerifyCode)
  verifyCodeRepository: Repository<VerifyCode>

  async getVerifyCode(redisKey: string, width: number, height: number, length = 4) {
    const { data, text } = svgCaptcha.create({
      size: length, // 验证码长度
      ignoreChars: 'o01ijlaqf', // 忽略字符
      color: true, // 是否采用彩色字符串
      noise: Math.floor(Math.random() * 3), // 干扰线条
      width, // 图片宽
      height, // 图片长
    })
    console.error(redisKey, text)

    await this.redis.set(redisKey, text)
    await this.redis.expire(redisKey, 15 * 60)

    return data
  }

  async checkVerifyCode(redisKey: string, code: string) {
    console.error(redisKey, code)
    const redisCode = await this.redis.get(redisKey)
    const result = redisCode?.toLowerCase() === code.toLowerCase()
    if (result) {
      // 验证成功删除Key
      await this.redis.del(redisKey)
    }
    return result
  }
}
