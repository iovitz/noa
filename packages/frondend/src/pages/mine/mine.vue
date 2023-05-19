<template>
	<view class="mine-page">
		<view class="avatar-wrapper">
			<uni-list-item
				:title="nickname"
				note="列表描述信息"
				showArrow
				:border="false"
				thumb="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
			/>
		</view>
		<uni-grid :column="4" class="user-data-grid" :show-border="false" :square="false">
			<uni-grid-item v-for="{ name, value } in userData" :key="name">
				<view class="user-data-wrapper">
					<text class="value">{{ value }}</text>
					<text class="text">{{ name }}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
		<view class="mine-page-add"></view>
		<uni-list :border="false">
			<uni-list-item
				v-for="{ title, extraIcon } in optionsList"
				:key="title"
				:title="title"
				:show-extra-icon="true"
				:extra-icon="extraIcon"
				link
			/>
		</uni-list>
	</view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user.store';
import { computed, reactive } from 'vue';

const userStore = useUserStore();
console.log(userStore);

const nickname = computed(() => userStore.nickname);

const userData = reactive([
	{
		name: '帖子',
		value: 12,
	},
	{
		name: '动态',
		value: 4,
	},
	{
		name: '评论',
		value: 2,
	},
	{
		name: '粉丝',
		value: 132,
	},
]);
const optionsList = reactive([
	{
		title: '浏览历史',
		extraIcon: {
			color: '#007AFF',
			size: '22',
			type: 'map-filled',
		},
		routeName: '',
	},
	{
		title: '社区认证',
		extraIcon: {
			color: '#007AFF',
			size: '22',
			type: 'vip-filled',
		},
		routeName: '',
	},
	{
		title: '审核帖子',
		extraIcon: {
			color: '#007AFF',
			size: '22',
			type: 'starhalf',
		},
		routeName: '',
	},
]);
</script>

<style lang="scss" scoped>
.avatar-wrapper {
	padding: 30upx;
	background-color: #fff;
}
.user-data-grid {
	background-color: #fff;
}
.mine-page-add {
	height: 200upx;
	background-color: #eee;
	background-image: url(https://s1.ax1x.com/2023/04/03/pp4Fug1.jpg);
	background-size: cover;
}
.user-data-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 30upx 0;
	.value {
		font-size: 40upx;
	}
	.text {
	}
}
</style>
