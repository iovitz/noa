<template>
	<view class="find-page">
		<uni-nav-bar
			dark
			class="text-white"
			left-icon="left"
			title="查找用户"
			:border="false"
			height="100upx"
			status-bar
			background-color="#2AC4FF"
			:fixed="true"
		/>
		<view class="search-wrapper">
			<uni-easyinput
				v-model="searchValue"
				placeholder="输入用户名或者userid"
				@input="handleInput"
			></uni-easyinput>
		</view>

		<view class="search-result-list">
			<view class="search-user-item" v-for="{ nickname, username } in searchResult" :key="username">
				<view class="user-info">
					<h3>昵称：{{ nickname }}</h3>
					<p>id: {{ username }}</p>
				</view>
				<button @tap="() => handleGoSpace(username)" size="mini">查看</button>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { rFind } from '@/io/http/user';

const searchValue = ref('');
const searchResult = ref<
	{
		username: number;
		nickname: string;
		avatar: '';
	}[]
>([]);

const handleInput = (v: string) => (searchValue.value = v);
const handleSearch = () => {
	rFind(searchValue.value).then((res) => {
		searchResult.value = res.data;
	});
};
const handleGoSpace = (id: number) => {
	uni.navigateTo({
		url: '/pages/space/space?username=' + id,
	});
};
</script>

<style lang="scss" scoped>
.search-wrapper {
	display: flex;
	padding: 30upx;
	align-items: center;
	justify-content: center;
}
.search-button {
	margin-left: 10upx;
}
.search-result-list {
	padding: 30upx;
}
.search-user-item {
	display: flex;
	margin-bottom: 30upx;
	.user-info {
		flex: 1;
	}
}
</style>
