import { makeAutoObservable } from 'mobx'

export class FormEditorContextStore {
  name = '表格1'
  constructor() {
    makeAutoObservable(this)
  }

  changeName() {
    this.name = '表格2'
  }
}

export const formEditorStore = new FormEditorContextStore()

export const useFormEditorContextStore = () => formEditorStore
