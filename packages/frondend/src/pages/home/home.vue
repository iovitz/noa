<template>
	<PageWithBottonButton title="用户资料" buttonText="发送消息">
		<view class="header">
			<image
				class="avatar"
				mode="aspectFit"
				:src="'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'"
			/>
			<view class="home-info">
				<view class="nickname text-ellipsis">不锈钢盆</view>
				<view class="haha-number text-sm text-ellipsis">HAHA号: 256899231</view>
			</view>
		</view>

		<view class="user-info">
			<uni-group type="card" title="签名">
				<uni-list-item showArrow :border="false" clickable title="老子明天不上班" />
			</uni-group>
			<uni-group type="card" title="个人信息">
				<uni-list-item :border="false" title="年龄" rightText="18" />
				<uni-list-item :border="false" title="生日" rightText="12月19日" />
				<uni-list-item :border="false" title="现居" rightText="广东深圳" />
			</uni-group>
		</view>
		<uni-group type="card" title="空间动态">
			<uni-list-item :border="false" showArrow clickable title="他的空间" rightText="10条内容" />
		</uni-group>
	</PageWithBottonButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import PageWithBottonButton from '@/comps/page-with-bottom-button/page-with-bottom-button.vue';

const scrollViewHeight = ref(0);
onLoad((data) => {
	const sysInfo = uni.getSystemInfoSync();
	scrollViewHeight.value = sysInfo.screenHeight - uni.upx2px(100) * 2;
});
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	flex-direction: row;
	justify-content: home-between;
	padding: 50upx 30upx;
	.avatar {
		height: 140upx;
		width: 140upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
	.home-info {
		flex: 1;
		display: flex;
		justify-content: center;
		flex-direction: column;
		.nickname {
			font-weight: bold;
			font-size: 1.2em;
		}
		.haha-number {
			font-size: 24upx;
			margin-top: 6upx;
		}
	}
	.send-message {
		display: flex;
		align-items: center;
	}
}
</style>
