<template>
	<!-- <EmptyStatus type="message"></EmptyStatus> -->
	<view class="message-page">
		<uni-collapse>
			<uni-collapse-item
				:open="true"
				title="我的好友"
				:onchange="handleCollapseChange"
				:show-animation="false"
			>
				<uni-list :border="true">
					<!-- 显示圆形头像 -->
					<uni-list-chat
						:avatar-circle="true"
						title="uni-app"
						avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
						note="您收到一条新的消息"
					></uni-list-chat>
					<uni-list-chat
						:avatar-circle="true"
						title="uni-app"
						avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
						note="您收到一条新的消息"
					></uni-list-chat>
					<uni-list-chat
						:avatar-circle="true"
						title="uni-app"
						avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
						note="您收到一条新的消息"
					></uni-list-chat>
					<uni-list-chat
						:avatar-circle="true"
						title="uni-app"
						avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
						note="您收到一条新的消息"
					></uni-list-chat>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
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
				console.log(this.swiperHeight);
			},
		});
	},
	onNavigationBarButtonTap({ index }) {
		console.log(index);
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
		handleCollapseChange(e: any) {
			console.log(e);
		},
	},
	// components: { EmptyStatus },
});
</script>

<style lang="scss" scoped></style>
