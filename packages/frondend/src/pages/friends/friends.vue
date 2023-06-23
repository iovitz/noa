<template>
	<!-- <EmptyStatus type="message"></EmptyStatus> -->
	<page-with-header>
		<uni-list :border="false">
			<uni-list-item showArrow :border="false" clickable title="新朋友" />
			<uni-list-item showArrow :border="false" clickable title="通知" />
		</uni-list>
		<view class="mt-4">
			<uni-list :border="false">
				<uni-list-chat
					:avatar-circle="true"
					:border="false"
					v-for="i in 10"
					:key="i"
					title="uni-app"
					avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
					note="您收到一条新的消息"
				></uni-list-chat>
			</uni-list>
		</view>
	</page-with-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageWithHeader from '@/comps/page-with-header/page-with-header.vue';

export default defineComponent({
	components: { PageWithHeader },
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
