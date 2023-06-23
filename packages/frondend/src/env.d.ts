/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_NAME: string;
	readonly VITE_LOG_LEVEL: false;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

interface Uni {
	$u: any;
}

interface ButtonHTMLAttributes {
	type?: string;
}

declare module '@hyoga/uni-socket.io' {
	const io: any;
	export default io;
}
