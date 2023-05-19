<template>
	<view class="find-page">
		<view class="search-wrapper">
			<uni-easyinput
				v-model="searchValue"
				placeholder="输入用户名或者userid"
				@input="handleInput"
			></uni-easyinput>
			<button class="search-button" type="primary" size="mini" @tap="handleSearch">发布</button>
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
