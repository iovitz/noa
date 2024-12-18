import { createContext } from 'react'
import { PageStore } from './page/page.store'
import { UserStore } from './user.store'

export class RootStore {
  user = new UserStore()
  page = new PageStore()
}

export const rootStore = new RootStore()

// @ts-expect-error 挂载store到window上
window.store = rootStore

export const RootStoreContext = createContext(rootStore)
