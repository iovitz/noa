import { ioClient, ServerData } from '@/shared/io/io'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

interface UserInfo {
  nickname: string
  userId: string
}

export class UserStore {
  nickname = ''
  userId = ''
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'user-store',
      properties: Object.keys(this) as Array<keyof typeof this>,
      storage: localStorage,
    })
  }

  async register(email: string, password: string, code: string) {
    const { data } = await ioClient.request<ServerData<UserInfo>>({
      url: '/user/register',
      method: 'post',
      data: {
        email,
        password,
        code,
      },
    })
    this.setUserInfo(data)
    return data
  }

  async login(email: string, password: string, code: string) {
    const { data } = await ioClient.request<ServerData<UserInfo>>({
      url: '/user/login',
      method: 'post',
      data: {
        email,
        password,
        code,
      },
    })
    this.setUserInfo(data)
    return data
  }

  setUserInfo(data: UserInfo) {
    this.nickname = data.nickname
    this.userId = data.userId
  }
}

export const userStore = new UserStore()

export const useUserStore = () => userStore
