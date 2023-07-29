import { rLogin, rRegister } from '@/io/http/user'
import { longChain } from '@/io/ws/ws'
import logger from '@/utils/logger'
import { storage } from '@/utils/storage'
import { defineStore } from 'pinia'

interface UserStore {
  nickname: string
  username: string
  avatar: string | null
  userid: string
}
interface UserAction {
  login: (username: string, password: string) => void
  register: (nickname: string, username: string, password: string) => void
}

export const useUserStore = defineStore<'user', UserStore, {}, UserAction>('user', {
  persist: {
    key: 'user',
    paths: ['nickname', 'avatar', 'username', 'userid'],
  },
  state: () => {
    return {
      username: '',
      nickname: '',
      avatar: '',
      userid: '',
    }
  },
  actions: {
    async login(username, password) {
      const { code, data } = await rLogin(username, password)
      if (code === 0) {
        uni.showToast({
          title: '登录成功，正在跳转',
          duration: 1000,
          icon: 'success',
        })
        this.$patch({
          username: data.username,
          nickname: data.nickname,
          avatar: data.avatar,
          userid: data.userid,
        })
        logger.verbose('登录成功', data)
        storage.syncSet('session', data.session)
        longChain.connect()
      }
    },

    async register(nickname, username, password) {
      const { code, data } = await rRegister(nickname, username, password)
      if (code === 0) {
        uni.showToast({
          title: '注册成功，即将自动登录',
          duration: 2000,
          icon: 'success',
        })
        this.$patch({
          username: data.username,
          nickname: data.nickname,
          avatar: data.avatar,
          userid: data.userid,
        })
        logger.verbose('注册成功', data)
        storage.syncSet('session', data.session)
        longChain.connect()
      }
    },
  },
})
