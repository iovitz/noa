<template>
	<page-with-header>
		<view class="message-page">
			<uni-list :border="false">
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
				/>
			</uni-list>
		</view>
	</page-with-header>
</template>

<script lang="ts">
// import EmptyStatus from '@/comps/empty-status/empty-status.vue';
import { defineComponent } from 'vue';
import PageWithHeader from '@/comps/page-with-header/page-with-header.vue';

export default defineComponent({
	components: {
		PageWithHeader,
	},
	data() {
		return {
			refreshFlag: false,
			swiperHeight: 0,
		};
	},
	methods: {
		// 抽屉状态发生变化触发
		handlePopupChange(e: any) {
			console.log(e);
		},
		handleGoChat() {
			uni.navigateTo({
				url: '/pages/chat/chat',
			});
		},
		handleGoSearch() {
			console.log('前往搜索');
		},
	},
	// components: { EmptyStatus },
});
</script>

<style lang="scss" scoped></style>
