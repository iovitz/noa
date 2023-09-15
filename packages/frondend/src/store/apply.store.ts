import { ApplyItem } from '@/common/types/apply'
import { longChain } from '@/io/ws/ws'
import logger from '@/utils/logger'
import { defineStore } from 'pinia'

interface IStore {
  applyList: ApplyItem[]
}
interface IAction {
  newApply(data: unknown): void
}

export const userApplyStore = defineStore<'apply', IStore, {}, IAction>('apply', {
  persist: {
    key: 'apply',
    paths: [],
  },
  state: () => {
    return {
      applyList: [],
    }
  },
  actions: {
    newApply(data: unknown) {
      console.log('###', data)
    },
  },
})
