import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

// https://vitejs.dev/config/
export default {
	...defineConfig({
		plugins: [uni()],
	}),

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/common/theme.scss";',
			},
		},
	},
	transpileDependencies: ['@dcloudio/uni-ui'],
	server: {
		proxy: {
			'/dev/api': {
				target: 'http://localhost:8061/api', // 目标服务  
				changeOrigin: true,
				rewrite: path => path.replace(/^\/dev/, ''),
			}
		}
	}
};
