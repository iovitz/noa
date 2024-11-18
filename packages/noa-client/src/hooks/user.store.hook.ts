import { action, computed, makeAutoObservable } from 'mobx'

export function createStoreAuth() {
  // mobx 导出makeAutoObservable 接受一个对象返回可观察的对象，该对象是响应式的
  return makeAutoObservable({
    token: localStorage.getItem('token') ?? '',
    name: 'name',
  })
}

export const storeAuth = createStoreAuth()

export function useUserStore() {
  // 判断是否登录，创建可响应的计算属性的函数
  const isLogin = computed(() => storeAuth.name === 'nameaaa')

  // 登录
  const login = action(() => {
    storeAuth.name += 'a'
    console.error(storeAuth.name === 'nameaaa')
  })
  return { login, isLogin, name: storeAuth.name }
}
