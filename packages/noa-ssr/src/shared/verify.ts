import * as svgCaptcha from 'svg-captcha'

export function getVerifyCode(width: number, height: number, length = 4) {
  return svgCaptcha.create({
    size: length, // 验证码长度
    ignoreChars: 'o01ijlaqf', // 忽略字符
    color: false, // 是否采用彩色字符串
    noise: Math.floor(Math.random() * 3), // 干扰线条
    width, // 图片宽
    height, // 图片长
  })
}
