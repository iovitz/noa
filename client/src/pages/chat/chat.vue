<template>
	<!-- <EmptyStatus type="message"></EmptyStatus> -->
	<view class="chat-page">
		<view class="chat-message-container"> 22</view>
		<view class="chat-input-container">
			<uni-easyinput
				errorMessage
				v-model="inputValue"
				focus
				placeholder="请输入内容"
				@input="handleInput"
			>
			</uni-easyinput>
			<button class="send-button" type="primary" size="mini">发送</button>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// import EmptyStatus from '@/comps/empty-status/empty-status.vue';
const inputValue = ref('');

function handleInput() {}
</script>

<style lang="scss" scoped>
.chat-page {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	.chat-message-container {
		flex: 1;
	}
	.chat-input-container {
		padding: 30upx;
		display: flex;
		background-color: #fff;
		.send-button {
			margin-left: 30upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
