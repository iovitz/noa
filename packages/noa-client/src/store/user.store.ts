import { action, computed, makeObservable, observable } from 'mobx'

export class UserStore {
  constructor() {
    // 解决数据更新页面不跟着更新的方法
    makeObservable(this)
  }

  @observable
  count = 0

  @action
  increase() {
    this.count = this.count + 1
  }

  @action
  decrease() {
    this.count = this.count - 1
  }

  @computed
  get doubleCount() {
    return this.count * 2
  }
}
