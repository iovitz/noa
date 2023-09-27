class Storage {
	cookie = "";

	set(key, value, safely = true) {
		const data = typeof value === "string" ? value : JSON.stringify(value);
		return new Promise((success, fail) => {
			uni.setStorage({
				key,
				data,
				success,
				fail,
			});
		}).catch((e) => {
			if (!safely) {
				throw e;
			}
		});
	}

	syncSet(key, val, safely = true) {
		try {
			val = typeof val === "string" ? val : JSON.stringify(val);
			uni.setStorageSync(key, val);
		} catch (e) {
			if (!safely) {
				throw e;
			}
		}
	}

	/**
	 * 在storage中获取key对应的值
	 * @param {string} key 需要获取的key
	 * @return {T | null} 获取结果
	 */
	get(key) {
		const val = uni.getStorageSync(key);
		if (val) {
			try {
				return JSON.parse(val);
			} catch (e) {
				return val;
			}
		} else {
			return null;
		}
	}

	/**
	 * 移除指定的key
	 * @param {string} key 需要移除的key
	 */
	remove(key) {
		uni.removeStorageSync(key);
	}

	/**
	 * 判断storage中是否存在对应的key
	 * @param {string} key 需要查询的key
	 * @return {boolean} 查询结果
	 */
	has(key) {
		return this.get(key) !== null;
	}

	/**
	 * 清空本地存储
	 */
	clear() {
		uni.clearStorage();
	}
}

export const storage = new Storage();
