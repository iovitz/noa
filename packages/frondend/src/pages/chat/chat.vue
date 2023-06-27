<template>
	<!-- <EmptyStatus type="message"></EmptyStatus> -->
	<view class="chat-page">
		<uni-nav-bar
			dark
			class="text-white"
			left-icon="left"
			title="聊天"
			:border="false"
			height="100upx"
			status-bar
			background-color="#2AC4FF"
			:fixed="true"
			@clickLeft="handleBackup"
		/>
		<!-- <view class="chat-message-container"> 22</view> -->
		<view class="chat-input-container">
			<textarea
				class="message-input"
				v-model="inputValue"
				placeholder="请输入内容"
				@input="handleInput"
				:adjust-position="true"
				:auto-blur="true"
			/>

			<button class="send-button" type="primary" size="mini">发送</button>
		</view>
	</view>
</template>

<script setup lang="ts">
import logger from '@/utils/logger';
import { ref } from 'vue';

// import EmptyStatus from '@/comps/empty-status/empty-status.vue';
const inputValue = ref('');

function handleInput(e: Event) {
	logger.verbose('input', e);
}

const handleBackup = () => {
	uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.chat-page {
	height: 100%;
	width: 100%;
	.chat-message-container {
		flex: 1;
		line-height: 100upx;
	}
	.chat-input-container {
		position: fixed;
		height: 140upx;
		padding: 30upx;
		box-sizing: border-box;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		.message-input {
			height: 100%;
			flex: 1;
			padding: 10upx;
			background-color: #eaeaea;
			box-sizing: border-box;
		}
		.send-button {
			margin-left: 30upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
