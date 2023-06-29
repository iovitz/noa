<template>
	<view class="chat-message-list">
		<view
			:class="
				classNames('message-item', {
					reverse: itm.uid === currentUserId,
				})
			"
			v-for="itm in props.messageList"
			:key="itm.mid"
		>
			<image
				class="avatar"
				mode="aspectFit"
				@tap="() => goToHome(itm.uid)"
				:src="'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'"
			/>
			<view class="combind-messages">
				<view class="content-wrapper">
					<view class="content-text" v-if="itm.type === 'text'">
						{{ itm.content }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import type { IMessage } from '@hahachat/common';
import classNames from 'classnames';
import { ref } from 'vue';

const currentUserId = ref('222222222');
const props = defineProps<{
	messageList: IMessage[];
}>();

const goToHome = (uid: string) => {
	uni.navigateTo({
		url: '/pages/home/home?uid' + uid,
	});
};
</script>

<style lang="scss" scoped>
.chat-message-list {
	width: 100%;
	display: flex;
	transform: rotate(180deg);
	box-sizing: border-box;
	padding: 20upx;
	flex-direction: column;
}
.message-item {
	display: flex;
	width: 100%;
	flex-direction: row;
	align-items: flex-start;
	transform: rotate(180deg);
	gap: 20upx;
	&.reverse {
		flex-direction: row-reverse;
	}
	.avatar {
		border-radius: 50%;
		height: 80upx;
		width: 80upx;
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
			margin-bottom: 40upx;
		}
		.content-text {
			padding: 20upx;
			line-height: 1.5;
			word-break: break-word;
		}
	}
}
</style>
