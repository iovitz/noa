import { resolve } from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    tsDecorators: true,
  })],
  resolve: {
    alias: {
      // 键必须以斜线开始和结束
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  server: {
    port: 21922,
    proxy: {
      '/api-noa': {
        target: 'http://localhost:19001/', // 目标服务器地址
        changeOrigin: true, // 是否改变源地址
        // rewrite: path => path.replace(/^\/api/, '') // 重写路径
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets-noa/assets',
    copyPublicDir: true,
    manifest: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets-noa/[name].js`,
        chunkFileNames: `assets-noa/[name].js`,
        assetFileNames: `assets-noa/[name].[ext]`,
      },
    },
  },
})
