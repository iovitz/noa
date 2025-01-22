import path from 'node:path'
import { defineBuildConfig } from 'unbuild'
import pkg from './package.json'

export default defineBuildConfig({
  entries: ['./src/index'], // 打包入口
  outDir: './dist', // 打包后的输出文件夹
  declaration: true, // 打包导出 TS 类型代码，方便其他子项目使用有类型提示
  rollup: {
    emitCJS: true, // 输出 commonjs 格式代码
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  externals: Object.keys(pkg.peerDependencies), // 排除外部依赖，已经下载
})
