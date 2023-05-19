<template>
	<!-- <EmptyStatus type="message"></EmptyStatus> -->
	<view class="message-page">
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
			<uni-list :border="true">
				<uni-list-chat
					v-for="i in 99"
					:key="i"
					title="xieqianyu"
					:avatar-circle="true"
					avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
					note="您收到一条新的消息"
					time="2020-02-02 20:20"
					badge-positon="left"
					badge-text="99"
					@tap="handleGoChat"
					clickable
				></uni-list-chat>
			</uni-list>
		</scroll-view>
		<uni-popup ref="popupMenu" background-color="#fff" @change="handlePopupChange">
			<view class="popup-menu">
				<uni-list>
					<uni-list-item title="搜索" @tap="goFindPage" clickable />
					<uni-list-item title="创建群组" clickable />
				</uni-list>
			</view>
		</uni-popup>
	</view>
</template>

<script lang="ts">
// import EmptyStatus from '@/comps/empty-status/empty-status.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			refreshFlag: false,
			swiperHeight: 0,
		};
	},
	mounted() {
		uni.getSystemInfo({
			success: (res) => {
				this.swiperHeight = res.windowHeight;
				console.log(this.swiperHeight);
			},
		});
	},
	onNavigationBarButtonTap({ index }) {
		switch (index) {
			case 0:
				uni.navigateTo({
					url: '/pages/friends/friends',
				});
				break;
			case 1:
				console.log('打开popup');
				(this.$refs.popupMenu as any)?.open('top');
				break;
		}
	},
	methods: {
		goFindPage() {
			uni.navigateTo({
				url: '/pages/find/find',
			});
		},
		// 抽屉状态发生变化触发
		handlePopupChange(e: any) {
			console.log(e);
		},
		handleGoChat() {
			uni.navigateTo({
				url: '/pages/chat/chat',
			});
		},
		handleRefresh() {
			this.refreshFlag = true;
			console.log('下拉刷新');
			setTimeout(() => {
				this.refreshFlag = false;
			}, 1000);
		},
		handleLoadMore() {
			console.log('加载更多');
		},
	},
	// components: { EmptyStatus },
});
</script>

<style lang="scss" scoped>
.popup-menu-item {
	text-align: center;
	padding: 30upx;
}
</style>
