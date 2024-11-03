import { Injectable } from '@nestjs/common'
import moment from 'moment'
import svgCaptcha from 'svg-captcha'

@Injectable()
export class VerifyService {
  getVerifyCode(width: number, height: number, length = 4) {
    return svgCaptcha.create({
      size: length, // 验证码长度
      ignoreChars: 'o01ijlaqf', // 忽略字符
      color: false, // 是否采用彩色字符串
      noise: Math.floor(Math.random() * 3), // 干扰线条
      width, // 图片宽
      height, // 图片长
    })
  }

  checkVerifyCode(session: Record<string, string>, type, text) {
    // 获取验证码
    const code = session[`#c_${type}`] ?? ''
    const codeTime = session[`#t_${type}`] ?? ''
    // 判断验证码是不是30Min内下发的
    if (moment(codeTime).add(30, 'M') < moment(Date.now())) {
      return false
    }
    if (text.toLowerCase() !== code.toLowerCase()) {
      return false
    }
    delete session[`#c_${type}`]
    delete session[`#t_${type}`]
    return true
  }
}
