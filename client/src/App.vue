<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';

onLaunch(() => {
	// console.log('App Launch')
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
