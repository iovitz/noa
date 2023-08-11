import { error } from 'console'
import logger from '../logger'
import { storage } from '../storage/storage'
import { ip2int } from '@hahachat/common'

type Header = Record<string, string>
interface RequestConfig {
  baseURL: string
  timeout: number
  header: Header
}

interface Response<T = any> {
  [x: string]: any
  code: number
  data: T
  message: string
}

class ShortChain {
  private ipLong: string = '0'

  constructor(private config: RequestConfig) {
    this.config = config
    uni.request({
      url: 'https://ifconfig.me/ip',
      success: (res) => {
        this.ipLong = `${ip2int(res.data as string)}`
      },
    })
  }

  get isProd() {
    return process.env.NODE_ENV === 'production'
  }

  genLogId() {
    const envFlag = this.isProd ? 'P' : 'D'
    const logId = envFlag + this.ipLong.padStart(10, '0') + Date.now()
    return logId
  }

  public setHeader(key: string, value: string) {
    this.config.header[key] = value
  }

  public delHeader(key: string) {
    delete this.config.header[key]
  }

  private request(
    method: UniNamespace.RequestOptions['method'],
    url: string,
    data: any,
    requestHeader: Header = {}
  ) {
    return new Promise<UniApp.RequestSuccessCallbackResult>((success, fail) => {
      const { header, baseURL, timeout } = this.config
      uni.request({
        url: baseURL + url,
        data,
        method,
        success,
        fail,
        timeout,
        header: {
          ...header,
          ...requestHeader,
          authorization: storage.get('session'),
          ['x-tt-logid']: this.genLogId(),
        },
      })
    }).then(({ data, statusCode }: UniApp.RequestSuccessCallbackResult) => {
      const res = data as {
        data?: unknown
        message: string
      }
      if (statusCode < 400) {
        return res
      }
      switch (statusCode) {
        case 401:
          storage.remove('session')
          uni.reLaunch({
            url: '/pages/entry/entry',
          })
          const title = res.message || '认证已经过期'
          uni.showToast({
            title: title,
            icon: 'error',
          })
          return Promise.reject(res)
      }
    })
  }

  public get<T = unknown>(url: string, data: any = {}, header: Header = {}) {
    return this.request('GET', url, data, header) as Promise<Response<T>>
  }

  createPostLickRequest<T>(
    method: UniNamespace.RequestOptions['method'],
    url: string,
    data: unknown,
    header: Header = {}
  ) {
    return this.request(method, url, data, header) as Promise<Response<T>>
  }

  public post<T = unknown>(url: string, data: any = {}, header: Header = {}) {
    return this.createPostLickRequest<T>('POST', url, data, header)
  }

  public put<T = unknown>(url: string, data: any = {}, header: Header = {}) {
    return this.createPostLickRequest<T>('PUT', url, data, header)
  }

  public delete<T = unknown>(url: string, data: any = {}, header: Header = {}) {
    return this.createPostLickRequest<T>('DELETE', url, data, header)
  }
}

let baseURL = import.meta.env.VITE_API_PREFIX
// #ifdef  APP-PLUS
baseURL = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_PREFIX
// #endif

export const commonRequest = new ShortChain({
  baseURL,
  timeout: 60000,
  header: {},
})
