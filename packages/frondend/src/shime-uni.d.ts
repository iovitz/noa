import { ButtonHTMLAttributes as _ButtonHTMLAttributes } from 'vue'

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}

  interface ButtonHTMLAttributes {
    type: any
  }
}
declare namespace JSX {
  interface IntrinsicElements {
    button: any
  }
}
