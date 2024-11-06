import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as svgCaptcha from 'svg-captcha'
import { Repository } from 'typeorm'
import { VerifyCode } from '../sqlite/verify-code.entity'

@Injectable()
export class SecurityService {
  @InjectRepository(VerifyCode)
  verifyCodeRepository: Repository<VerifyCode>

  getVerifyCode(width: number, height: number, length = 4) {
    return svgCaptcha.create({
      size: length, // 验证码长度
      ignoreChars: 'o01ijlaqf', // 忽略字符
      color: true, // 是否采用彩色字符串
      noise: Math.floor(Math.random() * 3), // 干扰线条
      width, // 图片宽
      height, // 图片长
    })
  }

  saveVerifyToDB(ip: string, clientId: string, ua: string, code: string) {
    const verifyCode = this.verifyCodeRepository.create({
      ip,
      code,
      clientId,
      ua,
    })
    return this.verifyCodeRepository.save(verifyCode)
  }
}
