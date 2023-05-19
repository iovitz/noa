import { defineConfig } from 'vite'
import commonjs from '@rollup/plugin-commonjs'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default {
  ...defineConfig({
    plugins: [uni(), commonjs()]
  }),
  transpileDependencies: ['@dcloudio/uni-ui']
}
