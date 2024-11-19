import { ioClient } from '@/shared/io/io'
import { action, computed, makeAutoObservable } from 'mobx'

export function createStoreAuth() {
  // mobx 导出makeAutoObservable 接受一个对象返回可观察的对象，该对象是响应式的
  return makeAutoObservable({
    session: localStorage.getItem('session') ?? '',
    name: 'name',
  })
}

export const storeAuth = createStoreAuth()

// 判断是否登录，创建可响应的计算属性的函数
const isLogin = computed(() => storeAuth.name === 'nameaaa')

// 登录
const login = action((email: string, password: string, code: string) => {
  return ioClient.request({
    url: '/user/login',
    data: {
      email,
      password,
      code,
    },
  })
})

// 注册
const register = action((email: string, password: string, code: string) => {
  return ioClient.request({
    url: '/user/login',
    data: {
      email,
      password,
      code,
    },
  })
})

export function useUserStore() {
  return {
    ...storeAuth,
    login,
    register,
    isLogin,
  }
}
