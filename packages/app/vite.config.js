import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

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
	transpileDependencies: ["@dcloudio/uni-ui"],
	server: {
		proxy: {
			"/api": {
				// 本地开发
				target: "http://127.0.0.1:8061",
				changeOrigin: true,
			},
		},
	},
};
