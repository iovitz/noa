import { rGetUserInfo } from '@/io/http/user'
import logger from '@/utils/logger'
import { defineStore } from 'pinia'

interface UserStore {
  userinfo: Record<
    string,
    {
      nickname: string
      avatar?: string
      profile?: {
        birth?: string
        desc?: string
        gender?: string
      }
    }
  >
}
interface UserActions {
  fetchUserInfo: (useridList: string[], profile?: boolean) => void
}

export const useUserStore = defineStore<'user', UserStore, {}, UserActions>('user', {
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
    async fetchUserInfo(useridList, profile = false) {
      const { userinfo } = this
      logger.verbose('拉取用户信息', useridList)
      const { data } = await rGetUserInfo(useridList, profile)
      this.$patch({
        userinfo: {
          ...userinfo,
          ...data,
        },
      })
    },
  },
})
