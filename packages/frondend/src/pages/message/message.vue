<template>
	<page-with-header>
		<message-list></message-list>
	</page-with-header>
</template>

<script lang="ts">
// import EmptyStatus from '@/comps/empty-status/empty-status.vue';
import { defineComponent } from 'vue';
import PageWithHeader from '@/comps/page-with-header/page-with-header.vue';
import logger from '@/utils/logger';
import MessageList from '@/comps/message-list/message-list.vue';

export default defineComponent({
	components: {
		PageWithHeader,
		MessageList,
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
			logger.verbose(e);
		},
		handleGoSearch() {
			logger.verbose('前往搜索');
		},
	},
	// components: { EmptyStatus },
});
</script>

<style lang="scss" scoped></style>
