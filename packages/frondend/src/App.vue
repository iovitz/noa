<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import io from '@hyoga/uni-socket.io';
import logger from '@/utils/logger';

onLaunch(() => {
	const socket = io('http://127.0.0.1:28257/ws', {
		query: {},
		transports: ['websocket', 'polling'],
		timeout: 5000,
	});

	socket.on('connect', () => {
		const { id } = socket;

		logger.verbose('链接成功', id);
		// 发射
		socket.emit('hello', 'client hello payload');
		// 发射
		socket.emit('events', {
			name: 'alone',
		});
	});

	socket.on('error', (msg: any) => {
		logger.verbose('ws error', msg);
	});
});
onShow(() => {
	// logger.verbose('App Show')
});

onHide(() => {
	// logger.verbose('App Hide')
});
</script>

<!-- 这里的style不能设置scoped -->
<style lang="scss">
@import '@/common/uni.scss';
@import '@/static/icon/iconfont.css';
@import '@/common/tailwind.css';

page {
	height: 100%;
	background-color: #f5f5f5;
	font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
		Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}
</style>
