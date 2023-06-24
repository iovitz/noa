<template>
	<PageWithBottonButton
		title="用户资料"
		:buttonText="isFriends ? '发消息' : '添加好友'"
		:buttonClick="buttonClick"
		:show-button="true"
	>
		<avatar-header nickname="不锈钢盆" desc="HAHA号: 256899231"></avatar-header>

		<view class="user-info">
			<uni-group type="card" title="签名">
				<uni-list-item showArrow :border="false" clickable title="老子明天不上班" />
			</uni-group>
			<uni-group type="card" title="个人信息">
				<uni-list-item :border="false" title="年龄" rightText="18" />
				<uni-list-item :border="false" title="生日" rightText="12月19日" />
				<uni-list-item :border="false" title="现居" rightText="广东深圳" />
			</uni-group>
		</view>
		<uni-group type="card" title="空间动态">
			<uni-list-item :border="false" showArrow clickable title="他的空间" rightText="10条内容" />
		</uni-group>
	</PageWithBottonButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PageWithBottonButton from '@/comps/page-with-bottom-button/page-with-bottom-button.vue';
import logger from '@/utils/logger';
import AvatarHeader from '@/comps/avatar-header/avatar-header.vue';

const isFriends = ref(false);

const buttonClick = () => {
	if (isFriends.value) {
		logger.verbose('发送消息');
	} else {
		uni.navigateTo({
			url: '/pages/add/add',
		});
	}
};
</script>

<style lang="scss" scoped></style>
