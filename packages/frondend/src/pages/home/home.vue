<template>
	<view class="home-page">
		<uni-nav-bar
			dark
			class="text-white"
			left-icon="left"
			title="个人资料"
			:border="false"
			height="100upx"
			status-bar
			background-color="#2AC4FF"
			:fixed="true"
			@clickLeft="handleBackup"
		/>

		<scroll-view
			scroll-y="true"
			:style="`height: ${scrollViewHeight}px`"
			refresher-background="#eee"
		>
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
		</scroll-view>

		<view class="bottom-btn">
			<button class="send-btn" type="primary">发信息</button>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const nickname = ref('');
const info = ref<
	{
		username: number;
		nickname: string;
		avatar: '';
	}[]
>([]);

const scrollViewHeight = ref(0);
onLoad((data) => {
	const sysInfo = uni.getSystemInfoSync();
	scrollViewHeight.value = sysInfo.screenHeight - uni.upx2px(100) * 2;
});
const handleBackup = () => {
	uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.home-page {
	height: 100%;
	width: 100%;
	background-color: #fff;
	padding-bottom: 100upx;
	box-sizing: border-box;
	position: relative;
}
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
.bottom-btn {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100upx;
	padding: 5px 30upx;
	background-color: #f5f5f5;
	.send-btn {
		line-height: 80upx;
		font-size: inherit;
	}
}
</style>
