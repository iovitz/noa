<template>
	<CommonPageWrapper title="发布哈哈" buttonText="发布哈哈" :showButton="true">
		<view class="content-editor">
			<textarea
				class="editor"
				type="textarea"
				v-model="content"
				maxlength="1000"
				placeholder="请输入自我介绍"
				placeholder-style="color: #aaa"
			/>
			<UploadImage></UploadImage>
		</view>
	</CommonPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommonPageWrapper from '@/comps/common-page-wrapper/common-page-wrapper.vue';
import UploadImage from '@/comps/upload-image/upload-image.vue';

export default defineComponent({
	components: {
		CommonPageWrapper,
		UploadImage,
	},
	data() {
		return {
			content: '',
			fileList: [] as any[],
		};
	},
	methods: {
		handleUploadImage(e: any) {
			const files = e.file ?? [];
			this.fileList = [...this.fileList, ...files];
		},
		handleDeleteImage() {},
		handleBack() {
			uni.navigateBack();
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
	}
}
</style>
