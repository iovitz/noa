import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { customAlphabet } from 'nanoid'
import { CookieKeys } from 'src/shared/constans/cookie'
import { TracerService } from 'src/utils/tracer/tracer.service'

@Injectable()
export class InejctUtilsMiddleware implements NestMiddleware {
  @Inject(TracerService)
  private readonly tracer: TracerService

  use(req: Req, res: Res, next: () => void) {
    this.useCost(req, res)
    this.useCookie(req, res)
    this.useClientId(req, res)
    this.useTracerId(req, res)
    // 获取请求耗时（ns）
    next()
  }

  /**
   * 获取请求耗时
   */
  useCost(req: Req, res: Res) {
    const startNs = process.hrtime.bigint()
    res.getCostNs = req.getCostNs = function () {
      return Number(process.hrtime.bigint() - startNs).toLocaleString()
    }
  }

  private idGenerator = customAlphabet(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    10,
  )

  /**
   * 注入Cookie的快捷操作方法
   */
  useCookie(req: Req, res: Res) {
    res.getCookie = req.getCookie = function (key: CookieKeys) {
      return req.cookies[key]
    }

    res.setCookie = req.setCookie = function (key: CookieKeys, value: string) {
      return res.cookie(key, value, {
        signed: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        httpOnly: true,
      })
    }
  }

  /**
   * 使用链路追踪ID
   */
  useTracerId(req: Req, res: Res) {
    req.tracerId = res.tracerId = this.idGenerator()
  }

  /**
   * 使用客户端ID
   */
  useClientId(req: Req, res: Res) {
    req.clientId = req.getCookie(CookieKeys.ClientId) ?? this.idGenerator()
    res.cookie(CookieKeys.ClientId, req.clientId, {
      // 可以放到配置中
      signed: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      httpOnly: true,
    })
  }
}
