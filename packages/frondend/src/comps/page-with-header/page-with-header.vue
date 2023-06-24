<template>
	<view class="box-bg">
		<uni-nav-bar
			dark
			class="nav-bar border-none"
			height="100upx"
			:fixed="true"
			background-color="#2AC4FF"
			status-bar
			leftWidth="80upx"
			rightWidth="80upx"
			:border="false"
		>
			<template #left>
				<view class="w-full h-full flex flex-row items-center justify-end">
					<image
						class="avatar"
						mode="aspectFit"
						@tap="openUserAside"
						:src="'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'"
					></image>
				</view>
			</template>
			<template #right>
				<view class="w-full h-full flex flex-row items-center justify-center relative">
					<uni-icons type="plusempty" size="24" color="#ffffff" @tap="handleOpenHeaderMenu" />
				</view>
			</template>
			<view class="flex w-full h-full flex-col justify-center">
				<text class="font-bold">暴躁的不锈钢盆</text>
				<text class="text-sm">在线</text>
			</view>
		</uni-nav-bar>
	</view>

	<scroll-view
		scroll-y="true"
		:style="`height: ${swiperHeight}px`"
		refresher-enabled
		@scrolltolower="handleLoadMore"
		refresher-background="#eee"
		:refresher-triggered="refreshFlag"
		:refresher-threshold="50"
		@refresherrefresh="handleRefresh"
	>
		<uni-search-bar
			placeholder="超级搜索"
			@focus="handleGoSearch"
			cancelButton="none"
			class="bg-white"
		>
			<template #searchIcon>
				<uni-icons color="#999999" size="18" type="search" />
			</template>
		</uni-search-bar>

		<!-- 页面内容 -->
		<slot name="default" />
	</scroll-view>

	<uni-popup ref="headerMenu" background-color="#fff" @change="handlePopupChange" :safe-area="true">
		<view :style="headerMenuFixStyle"></view>
		<view class="add-dropdown">
			<view @tap="goFindPage">
				<uni-icons type="personadd" />
				添加好友
			</view>
			<view>
				<uni-icons type="plusempty" />
				创建群聊
			</view>
		</view>
	</uni-popup>

	<uni-drawer ref="userAside" @change="handlePopupChange" mode="left" :width="250">
		<view class="w-full h-full" :style="userAsideFixStyle">
			<user-aside />
		</view>
	</uni-drawer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import UserAside from '@/comps/user-aside/user-aside.vue';
import logger from '@/utils/logger';

export default defineComponent({
	props: {
		type: String,
	},
	components: {
		UserAside,
	},
	data() {
		return {
			refreshFlag: false,
			swiperHeight: 0,
			statusBarHeight: 0,
		};
	},
	computed: {
		userAsideFixStyle() {
			return `padding-top: ${this.statusBarHeight}px`;
		},
		headerMenuFixStyle() {
			return `padding-top: ${this.statusBarHeight + uni.upx2px(100)}px`;
		},
	},
	activated() {
		const userAsideRef: any = this.$refs.userAside;
		const headerMenuRef: any = this.$refs.headerMenu;
		headerMenuRef?.close();
		userAsideRef?.close();
	},
	mounted() {
		uni.getSystemInfo({
			success: (res) => {
				// 拿到可用window高度
				// 可用window高度 = 窗口高度 - 状态栏高度 - bottom占用（底部的tabBar高度，H5下为0，app下计算高度）
				const windowHeight =
					(res.safeArea?.height || res.windowHeight - (res.statusBarHeight ?? 0)) -
					res.windowBottom;
				// 如果有NavBar需要减去NavBar高度
				this.swiperHeight = windowHeight - uni.upx2px(100);
				this.statusBarHeight = res.statusBarHeight || 0;
			},
		});
	},
	methods: {
		openUserAside() {
			const userAsideRef: any = this.$refs.userAside;
			userAsideRef?.open();
			const headerMenuRef: any = this.$refs.headerMenu;
			headerMenuRef?.close();
		},
		goFindPage() {
			const headerMenuRef: any = this.$refs.headerMenu;
			headerMenuRef?.close();
			uni.navigateTo({
				url: '/pages/find/find',
			});
		},
		handleGoSearch() {
			logger.verbose('前往搜索');
		},
		handleOpenHeaderMenu() {
			const headerMenuRef: any = this.$refs.headerMenu;
			headerMenuRef?.open('top');
		},
		handlePopupChange(e: boolean | { show: boolean }) {
			logger.verbose('蒙层change事件', e);
			if (typeof e === 'boolean') {
				if (e) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			} else {
				if (e.show) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			}
		},
		handleRefresh() {
			this.refreshFlag = true;
			logger.verbose('下拉刷新');
			setTimeout(() => {
				this.refreshFlag = false;
			}, 1000);
		},
		handleLoadMore() {
			logger.verbose('加载更多');
		},
	},
});
</script>
<style lang="scss" scoped>
.nav-bar {
	.avatar {
		height: 70upx;
		width: 70upx;
		border-radius: 50%;
	}
}
.add-dropdown {
	top: 30upx;
	right: 30upx;
	background-color: #ffffff;
	border-radius: 10upx;
	font-size: 28upx;
	& > * {
		padding: 30upx;
	}
}
</style>
