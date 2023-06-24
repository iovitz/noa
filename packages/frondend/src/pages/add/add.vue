<template>
	<PageWithBottonButton :title="titleText" buttonText="发送申请" :showButton="true">
		<avatar-header nickname="不锈钢盆" desc="256899231"></avatar-header>
		<uni-group title="填写验证信息">
			<view class="px-4">
				<uni-easyinput type="textarea" v-model="message" placeholder="请输入内容"></uni-easyinput>
			</view>
		</uni-group>
	</PageWithBottonButton>
</template>

<script lang="ts" setup>
import PageWithBottonButton from '@/comps/page-with-bottom-button/page-with-bottom-button.vue';
import { computed, ref } from 'vue';
import AvatarHeader from '@/comps/avatar-header/avatar-header.vue';

const isAddUser = ref(true);

const titleText = computed(() => {
	return isAddUser.value ? '发送好友申请' : '发送群聊申请';
});

const message = ref('');
</script>

<style lang="scss" scoped></style>
