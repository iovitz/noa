<template>
	<view class="user-aside">
		<view class="header flex flex-row items-center">
			<image
				class="avatar"
				mode="aspectFit"
				:src="'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'"
			/>
			<view>
				<view class="font-bold text-xl text-ellipsis">不锈钢盆</view>
				<view class="text-sm text-ellipsis mt-1">高低得来两句</view>
			</view>
		</view>

		<uni-list :border="false">
			<uni-group class="user-aside-list-group bg-white" type="card" title="账号管理">
				<uni-list-item showArrow :border="false" clickable title="个人信息" />
				<uni-list-item showArrow :border="false" clickable title="账号管理" />
				<uni-list-item showArrow :border="false" clickable title="通知" />
				<uni-list-item showArrow :border="false" clickable title="退出登录" />
			</uni-group>

			<uni-group class="user-aside-list-group bg-white" type="card" title="关于和帮助">
				<uni-list-item :border="false" clickable title="版本信息" rightText="已是最新版本" />
				<uni-list-item showArrow :border="false" clickable title="官网" />
				<uni-list-item showArrow :border="false" clickable title="反馈" />
			</uni-group>
		</uni-list>
	</view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		type: String,
	},
	data() {
		return {
			statusBarHeight: 0,
		};
	},
	computed: {},
	methods: {},
});
</script>

<style lang="scss" scoped>
.user-aside {
	height: 100%;
	width: 100%;
	background-color: #ffffff;
	.header {
		padding: 80upx 30upx;
		.avatar {
			height: 100upx;
			width: 100upx;
			border-radius: 50%;
			margin-right: 20upx;
		}
	}
}
</style>
