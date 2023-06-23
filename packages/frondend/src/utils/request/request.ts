import logger from '../logger';
import { storage } from '../storage/storage';

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
	private config: RequestConfig;

	constructor(config: RequestConfig) {
		this.config = config;
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
					authorization: storage.get('token') || 'token',
				},
			});
		}).then((res: UniApp.RequestSuccessCallbackResult) => {
			const data = res.data as any;
			if (data.code !== 0) {
				logger.error('请求失败', data);
				uni.showToast({
					icon: 'error',
					title: data.message,
				});
			}
			return data;
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
	baseURL: 'http://localhost:28257/api',
	timeout: 60000,
	header: {},
});
