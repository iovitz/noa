import logger from '../logger'
import { getSession } from '../storage'

const whiteList = ['/pages/entry/entry']

export function RouterGaide(url: string) {
  if (whiteList.includes(url)) {
    return true
  }
  const session = getSession()
  if (!session) {
    logger.error('找不到Session，跳转登录页..')
    uni.reLaunch({
      url: '/pages/entry/entry',
    })
    return false
  }
  return true
}
