<template>
	<!-- <EmptyStatus type="message"></EmptyStatus> -->
	<uni-list :border="false">
		<uni-list-item
			showArrow
			:border="false"
			clickable
			title="新朋友"
			@tap="() => handleGoNotice(0)"
		/>
		<uni-list-item
			showArrow
			:border="false"
			clickable
			title="群通知"
			@tap="() => handleGoNotice(1)"
		/>
	</uni-list>
	<view class="mt-4">
		<uni-list :border="false">
			<uni-list-chat
				:avatar-circle="true"
				:border="false"
				clickable
				v-for="i in 10"
				:key="i"
				title="uni-app"
				avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				note="您收到一条新的消息"
			></uni-list-chat>
		</uni-list>
	</view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			swiperHeight: 0,
		};
	},
	mounted() {
		uni.getSystemInfo({
			success: (res) => {
				this.swiperHeight = res.windowHeight;
			},
		});
	},
	onNavigationBarButtonTap({ index }) {
		switch (index) {
			case 1:
				uni.navigateTo({
					url: '/pages/friends/friends',
				});
				break;
			case 2:
				break;
		}
	},
	methods: {
		// 抽屉状态发生变化触发
		handleGoNotice(tabName: number) {
			uni.navigateTo({
				url: '/pages/notice/notice?tab=' + tabName,
			});
		},
	},
});
</script>

<style lang="scss" scoped></style>
