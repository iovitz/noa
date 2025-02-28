import { IncomingHttpHeaders } from 'node:http'
import { Injectable } from '@nestjs/common'
import superagent from 'superagent'

@Injectable()
export class IoService {
  client = superagent

  get(url: string, query?: Record<string, any> | string, headers?: IncomingHttpHeaders) {
    return this.client.get(url).query(query).set(headers)
  }

  post(url: string, body: Record<string, unknown>, headers: IncomingHttpHeaders = {}, type: 'post' | 'put' | 'patch' | 'delete' = 'post') {
    return this.client[type](url).send(body).set(headers)
  }

  patch(url: string, body: Record<string, unknown>, headers: IncomingHttpHeaders) {
    return this.post(url, body, headers, 'patch')
  }

  put(url: string, body: Record<string, unknown>, headers: IncomingHttpHeaders) {
    return this.post(url, body, headers, 'put')
  }

  delete(url: string, body: Record<string, unknown>, headers: IncomingHttpHeaders) {
    return this.post(url, body, headers, 'delete')
  }
}
