import { defineStore } from 'pinia'

interface UserStore {
  nickname: string
  username: string
  avatar: string | null
  description: string | null
  gender: number | null
  
}

export const useUserStore = defineStore<'user', UserStore>('user', {
  persist: {
    key: 'user',
    paths: ['nickname', 'avatar', 'description', 'gender', 'username'],
  },
  state: () => {
    return {
      username: '',
      nickname: '',
      avatar: '',
      description: null,
      gender: null
    }
  },
})
