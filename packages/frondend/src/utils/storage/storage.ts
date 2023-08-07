class Storage {
  public cookie = ''

  public set(key: string, value: any, safely = true) {
    const data = typeof value === 'string' ? value : JSON.stringify(value)
    return new Promise((success, fail) => {
      uni.setStorage({
        key,
        data,
        success,
        fail,
      })
    }).catch((e) => {
      if (!safely) {
        throw e
      }
    })
  }

  public syncSet(key: string, val: any, safely = true) {
    try {
      val = typeof val === 'string' ? val : JSON.stringify(val)
      uni.setStorageSync(key, val)
    } catch (e) {
      if (!safely) {
        throw e
      }
    }
  }

  /**
   * 在storage中获取key对应的值
   * @param {string} key 需要获取的key
   * @return {T | null} 获取结果
   */
  public get<T = any>(key: string): T | null {
    const val = uni.getStorageSync(key)
    if (val) {
      try {
        return JSON.parse(val) as T
      } catch (e) {
        return val as unknown as T
      }
    } else {
      return null
    }
  }

  /**
   * 移除指定的key
   * @param {string} key 需要移除的key
   */
  public remove(key: string) {
    uni.removeStorageSync(key)
  }

  /**
   * 判断storage中是否存在对应的key
   * @param {string} key 需要查询的key
   * @return {boolean} 查询结果
   */
  public has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * 清空本地存储
   */
  public clear() {
    uni.clearStorage()
  }
}

export const storage = new Storage()
