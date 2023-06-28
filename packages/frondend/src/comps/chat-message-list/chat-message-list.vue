<template>
	<view class="chat-message-list">
		<view class="message-item">
			<image
				class="avatar"
				mode="aspectFit"
				:src="'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'"
			/>
			<view class="combind-messages">
				<view class="content-wrapper" v-for="itm in combindMessageList" :key="itm.mid">
					<view class="content-text" v-if="itm.type === 'text'">
						4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IMessage } from '@hahachat/common';

export default defineComponent({
	props: {
		messageList: Array,
	},
	mounted() {
		const messageList = (this.messageList || []).sort((a, b) => {
			return a.timestamp > b.timestamp;
		});
		console.log(messageList);
	},
});
</script>

<style lang="scss" scoped>
.chat-message-list {
	width: 100%;
	display: flex;
	transform: rotate(180deg);
	box-sizing: border-box;
	padding: 20upx;
}
.message-item {
	display: flex;
	width: 100%;
	flex-direction: row;
	align-items: flex-start;
	transform: rotate(180deg);
	.avatar {
		border-radius: 50%;
		height: 80upx;
		width: 80upx;
		margin-right: 20upx;
	}
	.combind-messages {
		max-width: 65vw;
		flex: 1;
		display: flex;
		flex-direction: column;
		.content-wrapper {
			max-width: 100%;
			border-radius: 10upx;
			background-color: #fff;
			margin-bottom: 20upx;
		}
		.content-text {
			padding: 20upx;
			line-height: 1.5;
			word-break: break-word;
		}
	}
}
</style>
