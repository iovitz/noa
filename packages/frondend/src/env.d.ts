/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Uni {
  $u: any
}

interface ButtonHTMLAttributes {
  type?: string
}

declare module '@hyoga/uni-socket.io' {
  export default any
}
