import { ButtonHTMLAttributes as _ButtonHTMLAttributes } from 'vue'

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}
