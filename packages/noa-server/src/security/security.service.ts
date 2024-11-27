import { Inject, Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { REDIS_CLIENT } from 'src/redis/redis.module'
import * as svgCaptcha from 'svg-captcha'

@Injectable()
export class SecurityService {
  @Inject(REDIS_CLIENT)
  redis: Redis

  async getVerifyCode(redisKey: string, width: number, height: number, length = 4) {
    const { data, text } = svgCaptcha.create({
      size: length, // 验证码长度
      ignoreChars: 'o01ijlaqf', // 忽略字符
      color: true, // 是否采用彩色字符串
      noise: Math.floor(Math.random() * 3), // 干扰线条
      width, // 图片宽
      height, // 图片长
    })

    await this.redis.set(redisKey, text)
    await this.redis.expire(redisKey, 15 * 60)

    return {
      data,
      text,
    }
  }

  async checkVerifyCode(redisKey: string, code: string) {
    const redisCode = await this.redis.get(redisKey)
    const result = redisCode?.toLowerCase() === code.toLowerCase()
    if (result) {
      // 验证成功删除Key
      await this.redis.del(redisKey)
    }
    return result
  }
}
