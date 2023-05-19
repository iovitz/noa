<template>
	<view class="space-page">
		<h1>昵称：{{ nickname }}</h1>
		<p>BB号: {{ username }}</p>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const nickname = ref('');
const info = ref<
	{
		username: number;
		nickname: string;
		avatar: '';
	}[]
>([]);

onLoad((data) => {
	const { username } = data;
});
</script>

<style lang="scss" scoped></style>
