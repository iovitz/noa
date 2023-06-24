<template>
	<view class="page-with-button-button">
		<uni-nav-bar
			dark
			class="text-white"
			left-icon="left"
			:title="props.title"
			:border="false"
			height="100upx"
			status-bar
			background-color="#2AC4FF"
			:fixed="true"
			@clickLeft="handleBackup"
		/>

		<scroll-view
			scroll-y="true"
			:style="`height: ${scrollViewHeight}px`"
			refresher-background="#eee"
		>
			<!-- 页面内容 -->
			<slot name="default" />
		</scroll-view>

		<view class="bottom-btn">
			<button class="send-btn" type="primary" @tap="handleButtonClick">
				{{ props.buttonText }}
			</button>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps<{
	title: string;
	buttonText: string;
	buttonClick?: () => void;
}>();

const scrollViewHeight = ref(0);
onMounted(() => {
	const sysInfo = uni.getSystemInfoSync();
	scrollViewHeight.value = sysInfo.screenHeight - uni.upx2px(100) * 2;
});
const handleBackup = () => {
	uni.navigateBack();
};

const handleButtonClick = () => {
	props.buttonClick?.();
};
</script>

<style lang="scss" scoped>
.page-with-button-button {
	height: 100%;
	width: 100%;
	background-color: #fff;
	padding-bottom: 100upx;
	box-sizing: border-box;
	position: relative;
}
.bottom-btn {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100upx;
	padding: 5px 30upx;
	background-color: #f5f5f5;
	.send-btn {
		line-height: 80upx;
		font-size: inherit;
	}
}
</style>
