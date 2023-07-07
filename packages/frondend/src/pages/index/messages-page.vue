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
	<message-list></message-list>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import messageList from '@/comps/message-list/message-list.vue';
import logger from '@/utils/logger';
import { rLogin } from '@/io/http/user';

console.log(rLogin);

export default defineComponent({
	components: {
		messageList,
	},
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
