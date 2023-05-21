<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';

onLaunch(() => {
	// uni.closeSocket(); // 确保已经关闭后再重新打开
	uni.connectSocket({
		// 【非常重要】必须确保你的服务器是成功的
		url: ' wss://192.168.1.106:28258/',
		success(data) {
			console.log(data);
			console.log('websocket正在连接...');
		},
		fail(data) {
			console.log('fail....', data);
		},
	});
});
onShow(() => {
	// console.log('App Show')
});
onHide(() => {
	// console.log('App Hide')
});
</script>

<!-- 这里的style不能设置scoped -->
<style lang="scss">
@import '@/common/uni.scss';
@import '@/static/icon/iconfont.css';
@import '@/common/uni.css';

page {
	height: 100%;
	background-color: #f0f2f5;
	font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
		Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}
</style>
