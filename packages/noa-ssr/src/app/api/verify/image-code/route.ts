import { HttpStatusCode } from 'axios'
import { NextRequest } from 'next/server'
import * as svgCaptcha from 'svg-captcha'
import { z } from 'zod'
import { logger } from '../../../../shared/logger'

export function GET(request: NextRequest) {
  const GetImageCode = z.object({
    type: z.enum(['login', 'register']),
    width: z.string().transform(v => Number(v)).refine(v => v > 0 && v < 400),
    height: z.string().transform(v => Number(v)).refine(v => v > 0 && v < 400),
    length: z.string().transform(v => Number(v)).refine(v => v > 0 && v < 10),
  })

  const params = request.nextUrl.searchParams
  // 参数校验
  const { success, data, error } = GetImageCode.safeParse({
    type: params.get('type'),
    height: params.get('height'),
    width: params.get('width'),
    length: params.get('length'),
  })

  if (!success) {
    return Response.json({
      err: error.formErrors,
    }, {
      status: HttpStatusCode.UnprocessableEntity,
    })
  }

  const { text } = svgCaptcha.create({
    size: length, // 验证码长度
    ignoreChars: 'o01ijlaqf', // 忽略字符
    color: false, // 是否采用彩色字符串
    noise: Math.floor(Math.random() * 3), // 干扰线条
    width: data.width, // 图片宽
    height: data.height, // 图片长
  })
  logger.info('验证码生成', text)

  return Response.json({
    name: text,
  })
}
