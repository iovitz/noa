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
			@clickLeft="handleBackup"
		/>
		<uni-search-bar
			:focus="true"
			v-model="searchValue"
			placeholder="输入HaHa号或昵称"
			cancelButton="true"
		>
		</uni-search-bar>
		<uni-group title="用户" top="20">
			<uni-list-chat
				title="不锈钢盆"
				@tap="handleOpenUserHome"
				clickable
				:avatar-list="avatarList"
				note="256899231"
			/>
		</uni-group>
		<uni-group title="群聊" top="20">
			<uni-list-chat title="不锈钢盆" clickable :avatar-list="avatarList" note="256899231" />
		</uni-group>

		<view class="search-result-list">
			<view class="search-user-item" v-for="{ nickname, username } in searchResult" :key="username">
				<view class="user-info">
					<h3>昵称：{{ nickname }}</h3>
					<p>id: {{ username }}</p>
				</view>
				<button size="mini">查看</button>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const searchValue = ref('');
const searchResult = ref<
	{
		username: number;
		nickname: string;
		avatar: '';
	}[]
>([]);

const avatarList = ref([
	{
		url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
	},
]);

const handleBackup = () => {
	uni.navigateBack();
};

const handleOpenUserHome = (id: number) => {
	uni.navigateTo({
		url: '/pages/home/home?userid=',
	});
};
</script>

<style lang="scss" scoped>
.find-page {
	height: 100%;
	width: 100%;
	background-color: #fff;
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
