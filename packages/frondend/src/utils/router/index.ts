import logger from '../logger'
import { getSession } from '../storage'

const whiteList = ['/pages/entry/entry']

export function RouterGaide(url: string) {
  if (whiteList.includes(url)) {
    return true
  }
  const session = getSession()
  if (!session) {
    uni.reLaunch({
      url: '/pages/entry/entry',
    })
    return false
  }
  return true
}
