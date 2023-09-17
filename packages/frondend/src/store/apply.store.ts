import { ApplyItem } from '@/common/types/apply'
import { EventBindStore } from '@/common/types/common'
import { SocketEvents } from '@/events/events'
import { rGetFriendApplyList, rPassFriendApply } from '@/io/http/apply'
import { longChain } from '@/io/ws/ws'
import { defineStore } from 'pinia'

interface IStore {
  applyList: ApplyItem[]
}
interface IAction extends EventBindStore {
  newApply(data: unknown): void
  requestApplyList(): void
  passApply(from: string, idx: number): void
}

export const useApplyStore = defineStore<'apply', IStore, {}, IAction>('apply', {
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
    newApply(data: { from: string; reason: string }) {
      const list = this.applyList.filter((apply) => apply.from !== data.from)
      this.applyList = [
        {
          read: false,
          reason: data.reason,
          from: data.from,
          pass: false,
        },
        ...list,
      ]
    },

    requestApplyList() {
      rGetFriendApplyList().then((res) => {
        this.applyList = res.data
      })
    },

    async passApply(from: string, idx: number) {
      this.applyList[idx].pass = true
      const res = await rPassFriendApply(from)
      if (res.code !== 0) {
        this.applyList[idx].pass = false
      }
    },

    bindEvent() {
      longChain.on(SocketEvents.NewFriendApply, this.newApply)
    },
    unbindEvent() {
      longChain.off(SocketEvents.NewFriendApply, this.newApply)
    },
  },
})
