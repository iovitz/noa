<template>
	<page-with-header>
		<view class="news-card-list">
			<news-card v-for="i in 10" :key="i"></news-card>
		</view>
	</page-with-header>
</template>

<script lang="ts">
import NewsCard from '@/comps/news-card/news-card.vue';
import { defineComponent } from 'vue';
import PageWithHeader from '@/comps/page-with-header/page-with-header.vue';

export default defineComponent({
	components: {
		PageWithHeader,
		NewsCard,
	},
	props: {
		id: {
			type: Number,
		},
		name: {
			type: String,
		},
	},
	data() {
		return {
			refreshFlag: false,
			swiperHeight: 0,
		};
	},
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '/pages/publish/publish',
		});
	},
	mounted() {
		uni.getSystemInfo({
			success: (res) => {
				this.swiperHeight = res.windowHeight;
				console.log(this.swiperHeight);
			},
		});
	},
	methods: {
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
});
</script>

<style lang="scss" scoped></style>
