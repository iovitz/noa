import logger from "../logger";
import { storage } from "../storage/storage";

class ShortChain {
	constructor(config) {
		this.config = config;
	}

	get isProd() {
		return process.env.NODE_ENV === "production";
	}
	setHeader(key, value) {
		this.config.header[key] = value;
	}

	delHeader(key) {
		delete this.config.header[key];
	}

	request(method, url, data, requestHeader = {}) {
		return new Promise((success, fail) => {
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
					authorization: storage.get("session"),
				},
			});
		}).then(({ data, statusCode }) => {
			const res = data;
			if (statusCode < 400) {
				return res;
			}
			switch (statusCode) {
				case 401:
					storage.remove("session");
					uni.reLaunch({
						url: "/pages/entry/entry",
					});
					const title = res.message || "认证已经过期";
					uni.showToast({
						title: title,
						icon: "error",
					});
			}
			return Promise.reject(res);
		});
	}

	get(url, data = {}, header = {}) {
		return this.request("GET", url, data, header);
	}

	createPostLickRequest(method, url, data, header = {}) {
		return this.request(method, url, data, header);
	}

	post(url, data = {}, header = {}) {
		return this.createPostLickRequest("POST", url, data, header);
	}

	put(url, data = {}, header = {}) {
		return this.createPostLickRequest("PUT", url, data, header);
	}

	delete(url, data = {}, header = {}) {
		return this.createPostLickRequest("DELETE", url, data, header);
	}
}

let baseURL = import.meta.env.VITE_API_PREFIX;
// #ifdef  APP-PLUS
baseURL = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_PREFIX;
// #endif

export const commonRequest = new ShortChain({
	baseURL,
	timeout: 60000,
	header: {},
});
