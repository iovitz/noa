/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME
  readonly VITE_LOG_LEVEL: false
  readonly VITE_WS_URL
  readonly VITE_WS_PATH
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Uni {
  $u
}

interface ButtonHTMLAttributes {
  type?
}

declare module '@hyoga/uni-socket.io' {
  export * from 'socket.io-client'
}
