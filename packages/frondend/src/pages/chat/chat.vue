<template>
	<!-- <EmptyStatus type="message"></EmptyStatus> -->
	<view class="chat-page">
		<uni-nav-bar
			dark
			class="text-white"
			left-icon="left"
			right-icon="person"
			title="聊天"
			:border="false"
			leftWidth="70upx"
			rightWidth="70upx"
			height="100upx"
			status-bar
			background-color="#2AC4FF"
			:fixed="true"
			@clickLeft="handleBackup"
			@clickRight="handleOpenUser"
		/>

		<scroll-view
			scroll-y="true"
			class="chat-message-container"
			:style="`height: ${swiperHeight}px`"
			@touchstart="handleTouchStart"
		>
			<view v-for="i in 130" class="message-item" :key="i">{{ i }}</view>
		</scroll-view>
		<!-- <view class="chat-message-container"> 22</view> -->
		<view
			:class="classNames(['chat-input-container', inputFocus && 'focus'])"
			:style="`bottom: ${keyboardheightchange}px`"
		>
			<button class="sound-button" size="mini">
				<uni-icons type="mic" size="28"></uni-icons>
			</button>

			<textarea
				class="message-input"
				v-model="inputValue"
				@input="handleInput"
				:fixed="true"
				:auto-blur="true"
				@focus="handleInputFocus"
				@blur="handleInputBlur"
				:hold-keyboard="true"
				ref="inputRef"
				@keyboardheightchange="keyboardheightchange"
			/>

			<button class="send-button" type="primary" size="mini">发送</button>
		</view>
	</view>
</template>

<script setup lang="ts">
import logger from '@/utils/logger';
import classNames from 'classnames';
import { computed, ref, onMounted } from 'vue';

// import EmptyStatus from '@/comps/empty-status/empty-status.vue';
const inputValue = ref('');
const inputFocus = ref(false);
const inputRef = ref<any>(null);

const handleTouchStart = () => {
	console.log(inputRef.value);
	console.log(inputRef.value?.focus);
	inputRef.value.focus = false;
};

function handleInput(e: Event) {
	logger.verbose('input', e);
}

const handleBackup = () => {
	uni.navigateBack();
};

const handleInputFocus = () => {
	logger.verbose('输入框Focus');
	inputFocus.value = true;
	inputHeight.value = uni.upx2px(180);
};
const handleInputBlur = () => {
	logger.verbose('输入框Blur');
	inputFocus.value = false;
	inputHeight.value = uni.upx2px(100);
	// keyboardHeight.value = 0
};

const handleOpenUser = () => {
	logger.verbose('打开用户界面');
	uni.navigateTo({
		url: '/pages/home/home',
	});
};

const windowHeight = ref(0);
const inputHeight = ref(uni.upx2px(100));
const keyboardHeight = ref(0);
const swiperHeight = computed(() => {
	return windowHeight.value - inputHeight.value - keyboardHeight.value;
});

// 键盘弹起事件
const keyboardheightchange = (res: any) => {
	keyboardHeight.value = res.detail?.height ?? 0;
};
onMounted(() => {
	uni.getSystemInfo({
		success: (res) => {
			windowHeight.value =
				(res.safeArea?.height || res.windowHeight - (res.statusBarHeight ?? 0)) -
				res.windowBottom -
				uni.upx2px(100);
			logger.verbose('窗口高度', windowHeight.value);
		},
	});
});
</script>

<style lang="scss" scoped>
.chat-message-container {
	transform: rotate(180deg);
	.message-item {
		transform: rotate(180deg);
	}
}
.chat-page {
	height: 100%;
	width: 100%;
	.chat-message-container {
		flex: 1;
		line-height: 100upx;
		background-color: #f5f5f5;
	}
	.chat-input-container {
		position: fixed;
		height: 100upx;
		padding: 20upx;
		box-sizing: border-box;
		left: 0;
		right: 0;
		display: flex;
		align-items: flex-end;
		background-color: #ffffff;
		&.focus {
			height: 180upx;
			.message-input {
				height: 140upx;
			}
		}
		.message-input {
			height: 60upx;
			line-height: 40upx;
			flex: 1;
			padding: 10upx;
			background-color: #f5f5f5;
			box-sizing: border-box;
		}
		.sound-button {
			padding: 0;
			line-height: 60upx;
			width: 60upx;
			margin-right: 10upx;
			position: relative;
			justify-content: center;
			align-items: center;
			display: flex;
		}
		.send-button {
			margin-left: 10upx;
			display: flex;
			height: 60upx;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
