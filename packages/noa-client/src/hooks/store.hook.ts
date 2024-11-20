import { RootStore, RootStoreContext } from '@/store'
import { useContext } from 'react'

export function useStore(): RootStore
export function useStore<T extends keyof RootStore>(key: T): RootStore[T]
export function useStore(key?: keyof RootStore) {
  const rootStore = useContext(RootStoreContext)
  return key ? rootStore[key] : rootStore
}
