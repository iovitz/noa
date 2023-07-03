<template>
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
			clickable
		/>
	</uni-list>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import logger from '@/utils/logger';

export default defineComponent({
	components: {},
	methods: {
		handleGoSearch() {
			logger.verbose('前往搜索');
		},
	},
});
</script>

<style lang="scss" scoped>
.main-page {
	height: 100%;
	width: 100%;
}
</style>
