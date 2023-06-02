import App from './App.vue';
import { createSSRApp } from 'vue';
import { pinia } from './store';
import { createPinia } from 'pinia';

export function createApp() {
	const app = createSSRApp(App);
	app.use(createPinia());
	return {
		app,
	};
}
