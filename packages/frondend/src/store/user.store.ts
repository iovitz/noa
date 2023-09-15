import { UserInfo } from '@/common/types/user'
import { rGetUserInfo } from '@/io/http/user'
import logger from '@/utils/logger'
import { defineStore } from 'pinia'

interface IStore {
  userinfo: Record<string, UserInfo>
}
interface IAction {
  fetchUserInfo: (useridList: string[], profile?: boolean, force?: boolean) => void
}

const fetchingUserIds = new Set<string>()

export const useUserStore = defineStore<'user', IStore, {}, IAction>('user', {
  persist: {
    key: 'user',
    paths: ['userinfo'],
  },
  state: () => {
    return {
      userinfo: {
        zs: {
          nickname: '张三',
          age: 18,
        },
      },
    }
  },
  actions: {
    async fetchUserInfo(useridList, profile = false, force = false) {
      const { userinfo } = this
      // 过滤掉已经拉取过的UserID
      if (!force) {
        useridList = useridList.filter((uid) => {
          if (userinfo[uid] || fetchingUserIds.has(uid)) {
            return false
          } else {
            fetchingUserIds.add(uid)
            return true
          }
        })
      }
      // 加入fetching队列
      const { data } = await rGetUserInfo(useridList, profile)
      useridList.forEach((id) => fetchingUserIds.delete(id))
      this.$patch({
        userinfo: {
          ...userinfo,
          ...data,
        },
      })
    },
  },
})
