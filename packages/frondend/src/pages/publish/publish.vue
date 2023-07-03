<template>
	<CommonPageWrapper
		title="发布哈哈"
		buttonText="发布哈哈"
		:showButton="true"
		:button-click="handlePublish"
	>
		<view class="content-editor">
			<textarea
				class="editor"
				type="textarea"
				v-model="content"
				maxlength="1000"
				placeholder="请输入自我介绍"
				placeholder-style="color: #aaa"
			/>
			<UploadImage v-model="imageList"></UploadImage>
		</view>

		<uni-list-item showArrow :border="false" clickable title="权限设置" />
	</CommonPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommonPageWrapper from '@/comps/common-page-wrapper/common-page-wrapper.vue';
import UploadImage from '@/comps/upload-image/upload-image.vue';
import logger from '@/utils/logger';

export default defineComponent({
components: {
		CommonPageWrapper,
		UploadImage,
	},
	data() {
		return {
			content: '',
			imageList: [] as any[],
		};
	},
	watch: {
		imageList(v) {
			logger.verbose('图片上传', v);
		},
	},
	methods: {
		handlePublish() {
			logger.verbose('发布内容', {
				content: this.content,
				imageList: this.imageList,
			});
		},
	},
});
</script>

<style lang="scss" scoped>
.content-editor {
	background-color: #ffffff;
	padding: 30upx;
	.editor {
		width: 100%;
		box-sizing: border-box;
		font-size: 28upx;
		line-height: 1.5em;
		height: 200upx;
		margin-bottom: 30upx;
	}
}
</style>
