import logger from '../logger';
import { storage } from '../storage/storage';
import {ip2int} from '@hahachat/common'

type Header = Record<string, string>;
interface RequestConfig {
	baseURL: string;
	timeout: number;
	header: Header;
}

interface Response<T = any> {
	code: number;
	data: T;
	message: string;
}

class ShortChain {

  private ipLong: string = '0'

	constructor(private config: RequestConfig) {
		this.config = config;
    uni.request({
      url: 'https://ifconfig.me/ip',
      success: (res) => {
        this.ipLong = `${ip2int(res.data as string)}`
        console.log(this.ipLong)
      }
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
		this.config.header[key] = value;
	}

	public delHeader(key: string) {
		delete this.config.header[key];
	}

	private request(
		method: UniNamespace.RequestOptions['method'],
		url: string,
		data: any,
		requestHeader: Header = {}
	) {
		return new Promise<UniApp.RequestSuccessCallbackResult>((success, fail) => {
			const { header, baseURL, timeout } = this.config;
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
					authorization: storage.get('token'),
          ['x-tt-logid']: this.genLogId()
				},
			});
		}).then((res: UniApp.RequestSuccessCallbackResult) => {
			if (data.code !== 0) {
				logger.error('请求失败', data);
				uni.showToast({
					icon: 'error',
					title: data.message,
				});
			}
			return res.data;
		});
	}

	public get<T = unknown>(url: string, data: any = {}, header: Header = {}) {
		return this.request('GET', url, data, header) as Promise<Response<T>>;
	}

	public post<T = unknown>(url: string, data: any = {}, header: Header = {}) {
		return this.request('POST', url, data, header) as Promise<Response<T>>;
	}
}

export const commonRequest = new ShortChain({
	baseURL: import.meta.env.BASE_URL,
	timeout: 60000,
	header: {},
});
