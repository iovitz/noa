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
		<view class="chat-message-container"> 22</view>
		<view class="chat-input-container">
			<textarea
				class="message-input"
				auto-height
				v-model="inputValue"
				placeholder="请输入内容"
				@input="handleInput"
				:adjust-position="true"
				:auto-blur="true"
			/>

			<view class="send-button" type="primary" size="mini">发送</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import logger from '@/utils/logger';
import { ref } from 'vue';

// import EmptyStatus from '@/comps/empty-status/empty-status.vue';
const inputValue = ref('');

function handleInput(e: Event) {
	logger.verbose(e);
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
		padding: 30upx;
		position: fixed;
		height: 100upx;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		background-color: #fff;
		.message-input {
			height: 60upx;
			flex: 1;
			background: red;
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
