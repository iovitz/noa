import { IncomingHttpHeaders } from 'node:http'
import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import * as superagent from 'superagent'

@Injectable()
export class IoService {
  private client = superagent

  @Inject(REQUEST)
  request: Req

  post(url: string, body: Record<string, unknown>, header: IncomingHttpHeaders) {
    return this.client.post(url).send(body).set(header)
  }
}
