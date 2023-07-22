import { defineStore } from 'pinia'

interface UserStore {
  nickname: string
  username: string
  avatar: string | null
  userid: string
}

export const useUserStore = defineStore<'user', UserStore>('user', {
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
})
