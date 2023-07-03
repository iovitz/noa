<template>
	<view class="main-page">
		<page-with-header :height-used="100">
			<messages-page v-if="activeTabIndex === 0"></messages-page>
			<friends-page v-if="activeTabIndex === 1"></friends-page>
			<discover-page v-if="activeTabIndex === 2"></discover-page>
		</page-with-header>
		<tab-bar v-model="activeTabIndex" :tab-items="tabItems" />
	</view>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TabBar from '@/comps/tabbar/tabbar.vue';
import pageWithHeader from '@/comps/page-with-header/page-with-header.vue';
import MessagesPage from './messages-page.vue';
import FriendsPage from './friends-page.vue';
import DiscoverPage from './discover-page.vue';

export default defineComponent({
	components: {
		TabBar,
		pageWithHeader,
		MessagesPage,
		FriendsPage,
		DiscoverPage,
	},
	data() {
		return {
			activeTabIndex: 0,
			tabItems: [
				{
					name: '消息',
					icon: 'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				},
				{
					name: '好友',
					icon: 'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				},
				{
					name: '发现',
					icon: 'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				},
			],
		};
	},
});
</script>

<style lang="scss" scoped>
.main-page {
	height: 100%;
	width: 100%;
}
</style>
