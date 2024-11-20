import { ioClient } from '@/shared/io/io'
import { makeAutoObservable } from 'mobx'

interface UserInfo {
  nickname: string
  userId: string
}

export class UserStore {
  nickname = ''
  userId = ''
  constructor() {
    makeAutoObservable(this)
  }

  async register(email: string, password: string, code: string) {
    const data = await ioClient.request<UserInfo>({
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
    const data = await ioClient.request<UserInfo>({
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
